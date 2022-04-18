import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import classesAllorders from "./AllOrders.module.css";

const AllOrders = (props) => {
  const [orders, setOrders] = useState([]);

  const fetchMeals = async () => {
    const response = await fetch(
      "https://react-http-6c238-default-rtdb.firebaseio.com/orders.json"
    );
    const data = await response.json();

    let loadedData = [];

    for (let key in data) {
      loadedData.push({
        id: key,
        customerName: data[key].user.name,
        orders: data[key].oderedItems.map((item) => ({
          id: item.id,
          amount: item.amount,
          orderName: item.name,
          total: item.price,
        })),
      });
    }
    setOrders(loadedData);
  };
  useEffect(() => {
    fetchMeals();
  }, []);


  const list = orders.map((order) => (
    <div key={order.id} className={classesAllorders.order}>
      <h2>{order.customerName}</h2>
      <ul>
        {order.orders.map((order) => (
          <li>
            {order.orderName} - {order.total} x {order.amount}
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <div className={classes.meals}>
      <Card>{list}</Card>
    </div>
  );
};

export default AllOrders;
