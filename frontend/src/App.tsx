import "./App.css";

import Header from "./components/pages/Header.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import UserPage from "./components/pages/UserPage.tsx";

import OrdersPage from "./components/pages/OrdersPage.tsx";
import LikedItems from "./components/pages/LikedItems.tsx";
import UserInformation from "./components/pages/UserInformation.tsx";

import ItemsList from "./components/pages/ItemsList.tsx";
import Cart from "./components/pages/Cart.tsx";
import Support from "./components/pages/Support.tsx";

import Authorization from "./components/pages/Authorization.tsx";
import RegistrationForm from "./components/pages/RegistrationForm.tsx";
import LoginForm from "./components/pages/LoginForm.tsx";

import AdminPanel from "./components/pages/AdminPanel.tsx";
import ItemsDatabase from "./components/pages/ItemsDatabase.tsx";
import UsersDatabase from "./components/pages/UsersDatabase.tsx";
import OrdersDatabase from "./components/pages/OrdersDatabase.tsx";

import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";

import type { ItemObj,CartItem } from "./types.ts";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [items, setList] = useState([]);
  const [likedItemsList, changeLikedItem] = useState<ItemObj[]>([]);

  useEffect(() => {
    fetch("/api/items")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const decreaseCartItemCountHandler = (itemId: number) => {
    setCart((prev) =>
      prev.map((cartItem) => {
        if (cartItem.object.id === itemId) {
          const newCount = cartItem.count === 1 ? 1 : cartItem.count - 1;
          return { ...cartItem, count: newCount };
        }
        return cartItem;
      }),
    );
  };

  const increaseCartItemCountHandler = (itemId: number) => {
    setCart((prev) =>
      prev.map((cartItem) => {
        if (cartItem.object.id === itemId) {
          const newCount = cartItem.count + 1;
          return { ...cartItem, count: newCount };
        }
        return cartItem;
      }),
    );
  };

  const addToCartHandler = (item: ItemObj) => {
    setCart((prev) => {
      const isItemInCart = prev.find(
        (cartItem) => cartItem.object.id === item.id,
      );

      if (isItemInCart) {
        return prev.map((cartItem) =>
          cartItem.object.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem,
        );
      }

      return [...prev, { object: item, count: 1 }];
    });
  };

  const deleteItemFromCartHandler = (itemId: number) => {
    setCart((prev) => {
      return prev.filter((item) => item.object.id !== itemId);
    });
  };

  const itemLikedHandler = (likedItem: ItemObj) => {
    changeLikedItem((prev) => {
      if (prev.includes(likedItem)) {
        return prev.filter((item) => {
          return item.id != likedItem.id;
        });
      }
      return [...prev, likedItem];
    });
  };

  const orederIsAcceptedHandler = () => {
    setCart([]);
  };

  return (
    <div className="App">
      <Header cartItemsCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/modelsList"
          element={
            <ItemsList
              items={items}
              onAddToCartItem={addToCartHandler}
              onLikeButtonClicked={itemLikedHandler}
              likedItems={likedItemsList}
            />
          }
        />
        <Route path="/support" element={<Support/>} />
        <Route
          path="/cart"
          element={
            <Cart
              addedItems={cart}
              onDecreaseClicked={decreaseCartItemCountHandler}
              onIncreaseClicked={increaseCartItemCountHandler}
              onDeleteItemClicked={deleteItemFromCartHandler}
              onOrderAccepted={orederIsAcceptedHandler}
            />
          }
        />
        <Route path="/user-page" element={<UserPage />}>
          <Route path="orders" element={<OrdersPage />} />
          <Route
            path="liked-items"
            element={
              <LikedItems
                likedItems={likedItemsList}
                onLikeButtonClicked={itemLikedHandler}
                onAddToCartButtonClicked={addToCartHandler}
              />
            }
          />
          <Route path="user-information" element={<UserInformation />} />
        </Route>
        <Route path="/authorization" element={<Authorization />}>
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="itemsList" element={<ItemsDatabase />} />
          <Route path="usersList" element={<UsersDatabase />} />
          <Route path="ordersList" element={<OrdersDatabase />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
