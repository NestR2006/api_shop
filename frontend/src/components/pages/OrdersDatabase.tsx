import { useEffect, useState } from "react";
import _ from "lodash";

import type { OrderItem } from "../../types";


interface OrderInterface{
  items: OrderItem[],
  email: string,
  number: string,
  status: string,
  totalPrice: number,
  address: string,
}

const OrdersDatabase = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setPageNumber] = useState(1);
  const pages = [];
  const pageSize = 3;

  useEffect(() => {
    const asyncFetch = async () => {
      const response = await fetch("/api/admin/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    };
    asyncFetch();
  }, []);

  const changePageHandler = (number: number) => {
    setPageNumber(number);
  };

  const pagedOrders = _.slice(
    orders,
    (currentPage - 1) * pageSize,
    pageSize * currentPage > orders.length
      ? orders.length
      : pageSize * currentPage,
  );

  let pagesCount = Math.ceil(orders.length / pageSize);
  for (let i = 0; i < pagesCount; i++) {
    pages.push(
      <button
        key={i}
        className="page"
        onClick={() => {
          changePageHandler(i + 1);
        }}
      >
        {i + 1}
      </button>,
    );
  }

  const changeOrderStatusHandler = async (orderID: string, status: string) => {
    await fetch("/api/admin/change-order-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderID: orderID, status: status }),
    });
  };

  return (
    <>
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
          {pagedOrders?.map((order : OrderInterface) => {
            return (
              <tr>
                <td>{order.number}</td>
                <td>{order.email}</td>
                <td>
                  <select
                    name="status"
                    id="status"
                    defaultValue={order.status}
                    onChange={(event) =>
                      changeOrderStatusHandler(order.number, event.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{order.address}</td>
                <td>
                  <ul className="orders-items">
                    {order.items.map((item : OrderItem) => {
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
      <div className="pagination">{pages}</div>
    </>
  );
};

export default OrdersDatabase;
