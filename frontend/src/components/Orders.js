import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(response => setOrders(response.data.orders))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <h2>Order #{order.order_number}</h2>
          <div className="order-details">
            <p>Customer: {order.customer?.first_name} {order.customer?.last_name}</p>
            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Status: {order.financial_status}</p>
            <p>Total: ${order.total_price}</p>
            <div className="order-items">
              <h3>Items:</h3>
              <ul>
                {order.line_items.map(item => (
                  <li key={item.id}>
                    {item.quantity}x {item.title} - ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;