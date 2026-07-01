import { Link, Outlet } from "react-router";

import "../../styles/authorization.css";

const Authorization = () => {
  return (
    <section id="authorization">
      <div className="side-bar">
        <Link to="/authorization/registration">Регистрация</Link>
        <Link to="/authorization/login">Вход</Link>
      </div>
      <div className="form-container">
        <Outlet />
      </div>
    </section>
  );
};

export default Authorization;
