import React, { useState } from "react";
import PropTypes from "prop-types";

const CartItem = ({ itemInfo }) => {
  const [counter, updateCounter] = useState(0);

  const increaseHandler = () => {
    updateCounter(counter + 1);
  };

  const decreaseHandler = () => {
    updateCounter(counter === 0 ? counter : counter - 1);
  };

  return (
    <div className="cart-item">
      <h5 className="hero-name">{itemInfo.name}</h5>
      <h6 className="anime-name">{itemInfo.anime}</h6>
      <button className="increase" onClick={increaseHandler}>
        +
      </button>
      <button className="decrease" onClick={decreaseHandler}>
        -
      </button>
      <p className="counter">{counter}</p>
    </div>
  );
};

CartItem.propTypes = {
  itemInfo: PropTypes.object.isRequired,
};

export default CartItem;
