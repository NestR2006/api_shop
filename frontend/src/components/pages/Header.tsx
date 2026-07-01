import { Link } from "react-router-dom";

import "../../styles/header.css";

interface HeaderProps{
  cartItemsCount: number,
}

const Header = ({ cartItemsCount } : HeaderProps) => {
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
          <button id="search-button">
            <img
              src="https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF"
              alt=""
              className="btn-icon"
            />
          </button>
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

export default Header;
