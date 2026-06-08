import React from "react";

import "../styles/OrdersPage.css";

import AsukaImg from "../assets/dakimakures/asuka_dakimakura.png";
import ZeroTwo from "../assets/dakimakures/zero-two.png";
import ReiImg from "../assets/dakimakures/rei-dakimakura.png";

const ordersData = [
  {
    id: "7749-A",
    date: "04.06.2026",
    status: "delivered", // варианты: delivered, in-transit, processing
    totalPrice: 11500,
    items: [
      {
        id: 1,
        title: "Дакимакура Аска Лэнгли",
        price: 5500,
        quantity: 1,
        image: AsukaImg,
      },
      {
        id: 3,
        title: "Дакимакура Нулевая Два",
        price: 6000,
        quantity: 1,
        image: ZeroTwo,
      },
    ],
  },
  {
    id: "7320-B",
    date: "12.05.2026",
    status: "processing",
    totalPrice: 5500,
    items: [
      {
        id: 2,
        title: "Дакимакура Рей Аянами",
        price: 5500,
        quantity: 1,
        image: ReiImg,
      },
    ],
  },
];

const OrdersPage = () => {
  const orders = ordersData;

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
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-meta">
                <span className="order-number">Заказ №{order.id}</span>
                <span className="order-date">{order.date}</span>
              </div>

              <span className={`order-status ${order.status}`}>
                {order.status === "delivered" && "Доставлен"}
                {order.status === "in-transit" && "В пути"}
                {order.status === "processing" && "Обрабатывается"}
              </span>
            </div>

            {/* Список товаров внутри этого конкретного заказа */}
            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item-row">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="order-item-img"
                  />
                  <div className="order-item-info">
                    <h4>{item.title}</h4>
                    <p>
                      {item.quantity} шт. x {item.price} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Подвал карточки с итоговой ценой */}
            <div className="order-footer">
              <span className="total-label">Итого к оплате:</span>
              <span className="total-price">{order.totalPrice} ₽</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
