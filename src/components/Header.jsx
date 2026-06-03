import React from "react";
import PropTypes from "prop-types";

import "../styles/header.css";

const Header = ({
  onShowCatalog,
  onGoToMainPage,
  onShowCart,
  onShowComments,
  cartItemsCount,
}) => {
  return (
    <header>
      <a id="title" onClick={onGoToMainPage}>
        APIshop
      </a>
      <ul id="nav-buttons">
        <li>
          <a href="#" onClick={onShowCatalog}>
            Дакимакуры
          </a>
        </li>
        <li>
          <a href="#" onClick={onShowComments}>
            Отзывы
          </a>
        </li>
        <li>
          <a href="#">Поддержка</a>
        </li>
      </ul>
      <ul id="control-buttons">
        <li>
          <button id="search-button">
            <img
              src="https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </button>
        </li>
        <li>
          <button id="profile-button">
            <img
              src="https://img.icons8.com/?size=100&id=85356&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </button>
        </li>
        <li>
          <button id="cart-button" onClick={onShowCart}>
            <img
              src="https://img.icons8.com/?size=100&id=85080&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </button>
          {cartItemsCount > 0 ? (
            <p className="counter">{cartItemsCount}</p>
          ) : (
            ""
          )}
        </li>
      </ul>
    </header>
  );
};

Header.propTypes = {
  showCatalog: PropTypes.func.isRequired,
  goToMainPage: PropTypes.func.isRequired,
  onShowCart: PropTypes.func.isRequired,
  onShowComments: PropTypes.func.isRequired,
};

export default Header;
