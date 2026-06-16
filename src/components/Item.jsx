import React from "react";
import PropTypes from "prop-types";

import likeIcon from "../assets/like-icon.png";

const Item = ({ item, onAddToCart, onLikeClicked }) => {
  const handler = () => {
    console.log("aaa");
  };

  return (
    <li id={item.id} className="item">
      <button className="like-button" onClick={() => onLikeClicked(item)} />
      <img
        src={item.image}
        alt=""
        style={{ filter: `drop-shadow(5px 5px 5px ${item.color})` }}
      />
      <div className="labels">
        <h4 className="anine-name">{item.anime}</h4>
        <h2 className="hero-name">{item.name}</h2>
        <p className="rating">{item.rating}★</p>
        <p className="price">{item.price} UAH</p>
        <button className="add-to-cart" onClick={() => onAddToCart(item)}>
          Добавить в корзину
        </button>
      </div>
    </li>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onLikeClicked: PropTypes.func.isRequired,
};

export default Item;
