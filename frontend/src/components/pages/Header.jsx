import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import "../../styles/header.css";

const Header = ({ cartItemsCount }) => {
  const token = localStorage.getItem("token");

  return (
    <header>
      <Link id="title" to="/">
        APIshop
      </Link>
      <ul id="nav-buttons">
        <li>
          <Link to="/modelsList">Дакимакуры</Link>
        </li>
        <li>
          <Link to="/#comments">Отзывы</Link>
        </li>
        <li>
          <Link to="/support">Поддержка</Link>
        </li>
      </ul>
      <ul id="control-buttons">
        <li>
          <Link id="search-button">
            <img
              src="https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </Link>
        </li>
        <li>
          <Link
            id="profile-button"
            to={token ? "/user-page" : "/authorization/registration"}
          >
            <img
              src="https://img.icons8.com/?size=100&id=85356&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </Link>
        </li>
        <li>
          <Link id="cart-button" to="/cart">
            <img
              src="https://img.icons8.com/?size=100&id=85080&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
            {cartItemsCount > 0 ? (
              <p className="counter">{cartItemsCount}</p>
            ) : (
              ""
            )}
          </Link>
        </li>
      </ul>
    </header>
  );
};

Header.propTypes = {
  showCatalog: PropTypes.func.isRequired,
  goToMainPage: PropTypes.func.isRequired,
  onShowCart: PropTypes.func.isRequired,
  onSupportClicked: PropTypes.func.isRequired,
  onShowComments: PropTypes.func.isRequired,
};

export default Header;
