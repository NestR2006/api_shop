import React from "react";
import PropTypes from "prop-types";

const Header = ({ showCatalog, goToMainPage }) => {
  return (
    <header>
      <a id="title" onClick={goToMainPage}>
        APIshop
      </a>
      <ul id="nav-buttons">
        <li>
          <a href="#" onClick={showCatalog}>
            Дакимакуры
          </a>
        </li>
        <li>
          <a href="#">Отзывы</a>
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
          <button>
            <img
              src="https://img.icons8.com/?size=100&id=85356&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </button>
        </li>
        <li>
          <button>
            <img
              src="https://img.icons8.com/?size=100&id=85080&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </button>
        </li>
      </ul>
    </header>
  );
};

Header.propTypes = {
  showCatalog: PropTypes.func.isRequired,
  goToMainPage: PropTypes.func.isRequired,
};

export default Header;
