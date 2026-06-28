import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, Depends, Request, Response, UploadFile, Form, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
import hashlib
from authx import AuthX, AuthXConfig, RequestToken
from authx.exceptions import MissingTokenError, TokenExpiredError
from bson import ObjectId
from datetime import datetime
import random

class Item(BaseModel):
    id: int
    name: str
    price: int
    quantity: int
    image: str


class OrderForm(BaseModel):
    firstName: str
    lastName: str
    address: str
    phone: str
    email: EmailStr
    totalPrice: int
    items: List[Item]

class changeOrderStatusForm(BaseModel):
  orderID: str
  status: str
  
app = FastAPI()

# MONGO_URL = os.getenv("MONGO_URL")
MONGO_URL = "mongodb+srv://nesterovichroman5:romap066@shop.p2v8vw3.mongodb.net/shop?retryWrites=true&w=majority&appName=shop"

client = AsyncIOMotorClient(MONGO_URL)

@app.exception_handler(MissingTokenError)
async def missing_token_handler(request: Request, exc: MissingTokenError):
    return JSONResponse(
        status_code=401,
        content={"detail": "Not authenticated"},
    )


@app.exception_handler(TokenExpiredError)
async def expired_token_handler(request: Request, exc: TokenExpiredError):
    return JSONResponse(
        status_code=401,
        content={"detail": "Token expired"},
    )


config = AuthXConfig()
config.JWT_SECRET_KEY = "SECRET_KET"
config.JWT_ACCESS_COOKIE_NAME = "my_access_token"
config.JWT_TOKEN_LOCATION = ["cookies"]
security = AuthX(config=config)

client = AsyncIOMotorClient(MONGO_URL)

db = client.shop
items_collection = db.dakimakuras
users = db.users
orders = db.orders

CURRENT_DIR = Path(__file__).resolve().parent
ROOT_DIR = CURRENT_DIR.parent.parent
FRONTEND_BUILD_DIR = (CURRENT_DIR / ".." / ".." / "frontend" / "build").resolve()
IMGS_DIR = ROOT_DIR / "frontend" / "src" / "assets" / "dakimakures"
FRONTEND_STATIC_DIR = FRONTEND_BUILD_DIR / "static"

app.mount("/static", StaticFiles(directory=str(FRONTEND_STATIC_DIR)), name="static")
app.mount("/images", StaticFiles(directory=str(IMGS_DIR)), name="dakimakura_images")

def hash_password(password: str):
    hashed_buf = hashlib.sha256(password.encode())
    return hashed_buf.hexdigest()


@app.get("/api/items")
async def get_items():
    return await items_collection.find({}, {"_id": 0}).to_list(length=100)


class FormInfo(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    text: str


@app.post("/api/support")
def get_form(info: FormInfo):
    print(info)
    return {"status": "ok"}


class RegistrationForm(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: str
    address: str
    password: str


@app.post("/api/registration")
async def user_registration(form: RegistrationForm):
    person = await users.find_one({"email": form.email})
    if person:
        raise HTTPException(status_code=409, detail="User already exists")

    user = form.model_dump()
    user["password"] = hash_password(user["password"])
    user["role"] = "user"

    await users.insert_one(user)
    return {"status": "ok"}


class LoginForm(BaseModel):
    email: EmailStr
    password: str


@app.post("/api/login")
async def user_login(creds: LoginForm, response: Response):
    hashed_password = hash_password(creds.password)
    user = await users.find_one({"email": creds.email})
    if user is None:
        raise HTTPException(status_code=401, detail="incorrect username or password")
    if user["password"] == hashed_password:
        token = security.create_access_token(uid=str(user["_id"]))
        response.set_cookie(config.JWT_ACCESS_COOKIE_NAME, token)
        return {"status": "ok"}
    raise HTTPException(status_code=401, detail="incorrect username or password")


@app.get("/api/user-info")
async def get_user_information(token: RequestToken = Depends(security.access_token_required)):
    user = await users.find_one({"_id": ObjectId(token.sub)})
    if not user:
        return {"status": "error", "message": "User not found"}
    user.pop("password", None)
    user["_id"] = str(user["_id"])
    return {"status": "ok", "user": user}


@app.post("/api/make-order")
async def make_order(orderInfo: "OrderForm"):
    order = orderInfo.model_dump()
    order["status"] = "pending"
    order["number"] = generate_order_number()
    await orders.insert_one(order)
    return {"status": "ok"}


@app.get("/api/get-orders")
async def get_user_orders(token: RequestToken = Depends(security.access_token_required)):
    user = await users.find_one({"_id": ObjectId(token.sub)})
    orders_list = await orders.find({"email": user["email"]}).to_list(length=100)
    for order in orders_list:
        order["_id"] = str(order["_id"])
    return {"status": "ok", "orders": orders_list}


@app.get("/api/admin/verify")
async def verify_admin():
    return {"status": "ok"}


class DeleteItemRequest(BaseModel):
    itemId: int


@app.post("/api/admin/delete-item")
async def delete_item(data: DeleteItemRequest):
    print(data.itemId, "was deleted")
    item = await items_collection.delete_one({"id": data.itemId})
    print(item)
    return {"status": "ok"}


class ChangeItemForm(BaseModel):
    id: int
    name: str
    anime: str
    price: int
    rating: float


@app.post("/api/admin/change-item-info")
async def change_item_info(data: ChangeItemForm):
    result = await items_collection.update_one({"id" : data.id}, 
                                      {"$set" : data.model_dump()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return {"status": "ok"}


@app.get("/api/admin/users")
async def get_all_users():
    users_list = await users.find({}, {"password": 0}).to_list(length=100)
    for user in users_list:
        user["_id"] = str(user["_id"])
    return {"status": "ok", "users": users_list}


@app.get("/api/admin/orders")
async def get_all_orders():
    orders_list = await orders.find({}, {"_id": 0}).to_list(length=100)
    return {"status": "ok", "orders": orders_list}


@app.post("/api/admin/change-order-status")
async def change_order_status(orderToUpdate: changeOrderStatusForm):
  await orders.find_one_and_update({"number" : orderToUpdate.orderID}, {"$set" : {"status" : orderToUpdate.status}})

@app.post("/api/admin/add-item")
async def add_new_item(
  name: str = Form(...), 
  anime: str = Form(...),
  price: int = Form(...),
  rating: float = Form(...),
  image: UploadFile = File(...),
  color: str = Form(...)
):
  if image.content_type != "image/png":
        raise HTTPException(status_code=400, detail="Only PNG images allowed")
  print(name, anime, price, rating, color)
  print(image.filename, image.content_type)

  last_item = await items_collection.find_one({},sort=[("id", -1)])

  last_id = last_item["id"] if last_item else 0
  
  with open(IMGS_DIR / image.filename, "wb") as buf:
      buf.write(await image.read())
  
  items_collection.insert_one({"id": last_id + 1, 
                               "name": name, 
                               "anime" : anime, 
                               "price" : price, 
                               "sizes" : [], 
                               "image" : "/images/" + image.filename,
                               "isDoubleSized" : True,
                               "rating" : rating,
                               "inStock" : True,
                               "material" : "Cheremsha",
                               "color" : color})
  
  return {"status" : "ok"}


@app.get("/")
def serve_index():
    return FileResponse(str(FRONTEND_BUILD_DIR / "index.html"))


@app.get("/{full_path:path}")
def serve_react_app(full_path: str):
    return FileResponse(str(FRONTEND_BUILD_DIR / "index.html"))


def generate_order_number():
    date_part = datetime.now().strftime("%Y%m%d")
    random_part = random.randint(1000, 9999)
    return f"{date_part}-{random_part}"
