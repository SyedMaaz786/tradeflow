import React, { useEffect, useState } from "react";
import axios from "axios";
import { authHeader, API_URL } from "../authHeader";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(`${API_URL}/allOrders`, authHeader()).then((res) => {
        setOrders(res.data);
      });
    };

    fetchOrders();

    window.addEventListener("orderPlaced", fetchOrders);

    return () => {
      window.removeEventListener("orderPlaced", fetchOrders);
    };
  }, []);

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const modeClass = order.mode === "BUY" ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td className={modeClass}>{order.mode}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
