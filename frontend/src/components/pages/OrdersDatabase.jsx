import React, { useEffect, useState } from "react";

const OrdersDatabase = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const asyncFetch = async () => {
      const response = await fetch("/admin/orders");
      if (response.ok) {
        const data = await response.json();
        console.log(data.orders);
        setOrders(data.orders);
      }
    };
    asyncFetch();
  }, []);
  return (
    <table className="database-table">
      <thead>
        <th>Order number</th>
        <th>Email</th>
        <th>Status</th>
        <th>Address</th>
        <th>Items</th>
        <th>Total</th>
      </thead>
      <tbody>
        {orders?.map((order) => {
          return (
            <tr>
              <td>{order.number}</td>
              <td>{order.email}</td>
              <td>{order.status}</td>
              <td>{order.address}</td>
              <td>
                <ul className="orders-items">
                  {order.items.map((item) => {
                    return (
                      <li>
                        {item.name} {item.quantity}x
                      </li>
                    );
                  })}
                </ul>
              </td>
              <td>{order.totalPrice}₴</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrdersDatabase;
