import { useEffect, useState } from "react";

import "../../styles/adminPanel.css";
import { Outlet, Link } from "react-router-dom";

const AdminPanel = () => {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      const response = await fetch("/api/admin-verify", {
        method: "GET",
        credentials: "include",
      });

      setAllowed(response.ok);
    };

    asyncFetch();
  }, []);

  if (!allowed) {
    return <h1>У вас нет прав!</h1>;
  }

  return (
    <section className="admin-panel">
      <div className="admin-side-bar">
        <h1 className="title">Admin</h1>

        <div className="links">
          <Link to="/admin/itemsList">Товары</Link>
          <Link to="/admin/usersList">Пользователи</Link>
          <Link to="/admin/ordersList">Заказы</Link>
        </div>
      </div>

      <div className="content-container">
        <Outlet />
      </div>
    </section>
  );
};

export default AdminPanel;
