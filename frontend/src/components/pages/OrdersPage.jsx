import React, { useEffect, useState } from "react";

import "../../styles/OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrdersList] = useState([]);

  useEffect(() => {
    const get_orders = async () => {
      const response = await fetch("/api/get-orders", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setOrdersList(data.orders);
      }
    };

    get_orders();
  }, []);

  if (orders.length === 0) {
    return (
      <h2 className="no-orders">
        У тебя пока нет заказов. Время прикупить дакимакуру!
      </h2>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">История ваших заказов</h1>

      <div className="orders-list">
        {orders?.map((order) => (
          <div key={order?.number} className="order-card">
            <div className="order-header">
              <div className="order-meta">
                <span className="order-number">Заказ №{order?.number}</span>
                <span className="order-date">{order?.date}</span>
              </div>

              <span className={`order-status ${order?.status}`}>
                {order.status === "delivered" && "Доставлен"}
                {order.status === "shipping" && "В пути"}
                {order.status === "pending" && "Ожидается"}
                {order.status === "cancelled" && "Отменен"}
                {order.status === "processing" && "В обработке"}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item-row">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="order-item-img"
                  />
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <p>
                      {item.quantity} шт. x {item.price} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <span className="total-label">Итого к оплате:</span>
              <span className="total-price">{order.totalPrice} ₴</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
