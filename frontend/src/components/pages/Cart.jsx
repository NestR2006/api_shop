import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import CartItem from "../CartItem";

import "../../styles/cart.css";
import { useNavigate } from "react-router-dom";

const Cart = ({
  addedItems,
  onIncreaseClicked,
  onDecreaseClicked,
  onOrderAccepted,
}) => {
  let finalPrice = 0;

  const navigate = useNavigate();

  const [data, setUserInfo] = useState();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const dataBlock = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      email: emailRef.current.value,
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
              itemInfo={addedItem}
              key={addedItem.object.id}
              onDecrease={onDecreaseClicked}
              onIncrease={onIncreaseClicked}
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

Cart.propTypes = {
  addedItems: PropTypes.array.isRequired,
  onIncreaseClicked: PropTypes.func.isRequired,
  onDecreaseClicked: PropTypes.func.isRequired,
  onOrderAccepted: PropTypes.func.isRequired,
};

export default Cart;
