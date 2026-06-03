import React, { useState } from "react";
import PropTypes from "prop-types";

const CartItem = ({ itemInfo, onDecrease, onIncrease, count }) => {
  return (
    <div className="cart-item">
      <h5 className="hero-name">{itemInfo.object.name}</h5>
      <h6 className="anime-name">{itemInfo.object.anime}</h6>
      <button
        className="increase"
        onClick={() => onIncrease(itemInfo.object.id)}
      >
        +
      </button>
      <button
        className="decrease"
        onClick={() => onDecrease(itemInfo.object.id)}
      >
        -
      </button>
      <p className="counter">{count}</p>
    </div>
  );
};

CartItem.propTypes = {
  itemInfo: PropTypes.object.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default CartItem;
