import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import "../../styles/profilePage.css";

import TestPfp from "../../assets/kontuzius-pfp.jpg";

const UserPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loadUser = async () => {
      const response = await fetch("/api/user-info", {
        credentials: "include",
      });
      if (response.status === 401) {
        navigate("/authorization/login");
      }
    };

    loadUser();
  }, []);
  return (
    <section id="user-page">
      <div className="side-bar">
        <img src={TestPfp} alt="Картинка" className="profile-picture" />
        <h2 className="user-name">Test</h2>
        <Link to="/user-page/orders">Заказы</Link>
        <Link to="/user-page/liked-items">Любимые</Link>
        <Link to="/user-page/user-information">Информация</Link>
        <p className="page-name">ApiShop</p>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </section>
  );
};

export default UserPage;
