// orders.js
const orders = [
  {
    id: 1,
    bread: "Wheat Bread",
    protein: "Grilled Chicken",
    toppings: ["Red/Green Pepper Strips", "Sliced Pickles"],
    cheese: "Pepper Jack",
    toasted: "Yes",
    instructions: "extra cheese",
    totalPrice: 10.99,
  },
  {
    id: 2,
    bread: "Gluten Free Bread",
    protein: "Fried Chicken",
    toppings: ["Red/Green Pepper Strips", "Sliced Tomatoes"],
    cheese: "Swiss",
    toasted: "No",
    instructions: "toasted",
    totalPrice: 10.99,
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
