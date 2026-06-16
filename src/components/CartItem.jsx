import React, { useState } from "react";
import PropTypes from "prop-types";

const CartItem = ({ itemInfo, onDecrease, onIncrease, count }) => {
  return (
    <div className="cart-item">
      <div className="info">
        <h5 className="hero-name">{itemInfo.object.name}</h5>
        <h6 className="anime-name">{itemInfo.object.anime}</h6>
      </div>
      <div className="control-buttons-and-counter">
        <button
          className="control-button"
          onClick={() => onIncrease(itemInfo.object.id)}
        >
          +
        </button>
        <p className="counter">{count}</p>
        <button
          className="control-button"
          onClick={() => onDecrease(itemInfo.object.id)}
        >
          -
        </button>
      </div>
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
