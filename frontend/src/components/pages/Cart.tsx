import { useEffect, useRef, useState } from "react";

import CartItem from "../elements/CartItem";

import "../../styles/cart.css";

import type { ItemObj } from "../../types";

interface ItemClass{
  object : ItemObj,
  count: number,
}

interface User{
  firstName: string,
  lastName: string,
  email: string,
  address: string,
  phone: string,
}

interface CartProps{
  addedItems: ItemClass[],
  onIncreaseClicked: (itemId: number) => void,
  onDecreaseClicked: (itemId: number) => void,
  onDeleteItemClicked: (itemId: number) => void,
  onOrderAccepted: () => void,
}

const Cart = ({
  addedItems,
  onIncreaseClicked,
  onDecreaseClicked,
  onDeleteItemClicked,
  onOrderAccepted,
} : CartProps) => {
  let finalPrice = 0;

  const [data, setUserInfo] = useState<User>();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e : React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataBlock = {
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      address: addressRef.current!.value,
      phone: phoneRef.current!.value,
      email: emailRef.current!.value,
      totalPrice: finalPrice,
      items: addedItems.map((item) => ({
        id: item.object.id,
        name: item.object.name,
        price: item.object.price,
        quantity: item.count,
        image: item.object.image,
      })),
    };

    const response = await fetch("/api/make-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataBlock),
    });

    if (response.ok) {
      onOrderAccepted();
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetch("/api/user-info", {
        credentials: "include",
      });
      const userInfo = await response.json();
      if (response.ok) {
        setUserInfo(userInfo.user);
      }
    };

    loadUserInfo();
  }, []);

  addedItems.map((item) => {
    finalPrice += item.object.price * item.count;
  });

  const vatPrice = Number(((finalPrice * 23) / 123).toFixed(2));
  return (
    <section id="cart">
      <div className="cart-items">
        {addedItems.map((addedItem) => {
          return (
            <CartItem
              itemInfo={addedItem.object}
              key={addedItem.object.id}
              onDecrease={onDecreaseClicked}
              onIncrease={onIncreaseClicked}
              onDeleteClicked={onDeleteItemClicked}
              count={addedItem.count}
            />
          );
        })}
      </div>
      <form className="info-form" onSubmit={submitHandler}>
        <h2 className="title">Ваш заказ</h2>
        <input
          type="text"
          placeholder="First name"
          className="input-field"
          ref={firstNameRef}
          defaultValue={data?.firstName || ""}
        />
        <input
          type="text"
          placeholder="Last name"
          className="input-field"
          ref={lastNameRef}
          defaultValue={data?.lastName || ""}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          ref={emailRef}
          defaultValue={data?.email || ""}
        />
        <input
          type="text"
          placeholder="Phone number"
          className="input-field"
          ref={phoneRef}
          defaultValue={data?.phone || ""}
        />
        <input
          type="text"
          placeholder="Address"
          className="input-field"
          ref={addressRef}
          defaultValue={data?.address || ""}
        />
        <div className="summary-order">
          <div className="summary-row">
            <p className="label">
              {`${addedItems.length} ${
                addedItems.length % 10 > 4 || addedItems.length % 10 === 0
                  ? "товаров"
                  : "товара"
              } на сумму: `}
            </p>
            <p className="value">{finalPrice}₴</p>
          </div>
          <div className="tax-row">
            <p className="label">Налог НДС (23%): </p>
            <p className="value">{vatPrice}₴</p>
          </div>
        </div>

        <button className="make-order">Сделать заказ</button>
      </form>
    </section>
  );
};

export default Cart;
