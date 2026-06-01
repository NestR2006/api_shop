import React from "react";
import PropTypes from "prop-types";

import likeIcon from "../assets/like-icon.png";

const Item = (props) => {
  return (
    <li id={props.item.id} className="item">
      <button
        className="like-button"
        style={{ backgroundImage: `url(${likeIcon})` }}
      ></button>
      <img
        src={props.item.image}
        alt=""
        style={{ filter: `drop-shadow(5px 5px 5px ${props.item.color})` }}
      />
      <div className="labels">
        <h4 className="anine-name">{props.item.anime}</h4>
        <h2 className="hero-name">{props.item.name}</h2>
        <p className="rating">{props.item.rating}★</p>
        <p className="price">{props.item.price} UAH</p>
        <button className="add-to-cart">Добавить в корзину</button>
      </div>
    </li>
  );
};

export default Item;
