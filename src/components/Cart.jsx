import React from "react";
import PropTypes from "prop-types";

import CartItem from "./CartItem";

import "../styles/cart.css";

const Cart = ({ addedItems, onIncreaseClicked, onDecreaseClicked }) => {
  let finalPrice = 0;
  addedItems.map((item) => {
    finalPrice += item.object.price * item.count;
  });
  const vatPrice = Number(((finalPrice * 23) / 123).toFixed(2));
  console.log(finalPrice);
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
      <div className="info-form">
        <h2 className="title">Ваш заказ</h2>
        <input type="text" placeholder="First name" className="input-field" />
        <input type="text" placeholder="Last name" className="input-field" />
        <input type="email" placeholder="Email" className="input-field" />
        <input type="text" placeholder="Adress" className="input-field" />
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
      </div>
    </section>
  );
};

Cart.propTypes = {
  addedItems: PropTypes.array.isRequired,
  onIncreaseClicked: PropTypes.func.isRequired,
  onDecreaseClicked: PropTypes.func.isRequired,
};

export default Cart;
