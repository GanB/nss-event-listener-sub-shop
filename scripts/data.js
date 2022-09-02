// orders.js
const orders = [
  {
    id: 1,
    crust: "HandTossed",
    toppings: ["pepperoni", "green pepper"],
    instructions: "extra cheese",
  },
  {
    id: 2,
    crust: "Thin",
    toppings: ["Black Olives", "green pepper"],
    instructions: "half green peppers",
  },
];

export const getOrders = () => {
  // Add logic here to return a copy of your orders
  return orders.map((order) => ({ ...order }));
};

export const addNewOrder = (newOrder) => {
  let maxId = parseInt(orders.reduce((a, b) => (a.id > b.id ? a : b)).id);
  orders.push({ id: ++maxId, ...newOrder });
  document.dispatchEvent(new CustomEvent("newOrder"));
};
