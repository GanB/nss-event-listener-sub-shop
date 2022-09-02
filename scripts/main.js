import { getOrders, addNewOrder } from "./data.js";

document.getElementById("app").innerHTML = `
<h1>Peanut's Pizza Parlor</h1>
<div>
  <h3>Please make your pizza</h3>
  <div class="pizzaForm">
    <div class="crust">
      <p>Pick your crust</p>
      <label for="thinCrust">Thin</label>
      <input id="thinCrust" name="crust" type="radio" value="thin" />
      <label for="handTossedCrust">Hand Tossed</label>
      <input id="handTossedCrust" name="crust" type="radio" value="HandTossed" />
      <label for="handTossedCrust">Stuffed</label>
      <input id="stuffed" name="crust" type="radio" value="stuffed" />
      </div>
      <div class="toppings">
        <p>Pick your Toppings (Select all that apply)</p>
        <ul>
          <li>
            <input id="pepperoni" name="toppings" type="checkbox" value="pepperoni" />
            <label for="pepperoni">Pepperoni</label>
          </li>
          <li>
            <input id="Sausage" name="toppings" type="checkbox" value="Sausage" />
            <label for="Sausage">Sausage</label>
          </li>
          <li>
            <input id="Black Olives" name="toppings" type="checkbox" value="Black Olives" />
            <label for="Black Olives">Black Olives</label>
          </li>
          <li>
            <input id="Green Peppers" name="toppings" type="checkbox" value="Green Peppers" />
            <label for="Green Peppers">Green Peppers</label>
          </li>
          <li>
            <input id="Onions" name="toppings" type="checkbox" value="Onions" />
            <label for="Onions">Onions</label>
          </li>
        </ul>
    </div>
    <div class="extras">
      <label for="specialInstructions">Notes/Special Instructions</label>
      <div>
        <textarea id="specialInstructions"></textArea>
      </div>
    </div>
    <div>
      <button id="submitOrder">Order Pizza</button>
    </div>
  </div>
  <h3>Orders</h3>
  <div id="orders"></div>
</div>
`;

const displayOrders = () => {
  let ordersHtml = `<div><ul>`;
  const orders = getOrders();
  // Add logic here to put the orders on the DOM
  for (const order of orders) {
    ordersHtml += `<li> Order ID ${order.id}: ${
      order.crust
    } crust, with toppings: ${order.toppings.join(
      ", "
    )} and special instructions: ${order.instructions} </li>`;
  }
  ordersHtml += `</div></ul>`;
  document.getElementById("orders").innerHTML = ordersHtml;
};

const resetPizzaForm = () => {
  document.getElementById("thinCrust").checked = false;
  document.getElementById("handTossedCrust").checked = false;
  document.getElementById("stuffed").checked = false;
  document.getElementById("pepperoni").checked = false;
  document.getElementById("Sausage").checked = false;
  document.getElementById("Black Olives").checked = false;
  document.getElementById("Green Peppers").checked = false;
  document.getElementById("Onions").checked = false;

  const toppingsElements = document.querySelectorAll(
    "input[name=toppings]:checked"
  );

  toppingsElements.forEach((toppingElement) => {
    toppingElement = flase;
  });

  document.getElementById("specialInstructions").value = "";
};

displayOrders();

document.addEventListener("newOrder", (event) => {
  displayOrders();
  resetPizzaForm();
});

document.addEventListener("click", (e) => {
  if (e.target.id === "submitOrder") {
    // Need logic to get all the values from the form,
    // format them into an object and add that object to the `orders` array in `orders.js`

    // const thinCrust = document.getElementById("thinCrust");
    // const handTossedCrust = document.getElementById("handTossedCrust");
    // const stuffed = document.getElementById("stuffed");

    // let selectedCrust = "";
    // if (thinCrust.checked) selectedCrust = thinCrust.value;
    // if (handTossedCrust.checked) selectedCrust = handTossedCrust.value;
    // if (stuffed.checked) selectedCrust = stuffed.value;

    // const pepperoni = document.getElementById("pepperoni");
    // const sausage = document.getElementById("Sausage");
    // const blackOlives = document.getElementById("Black Olives");
    // const greenPeppers = document.getElementById("Green Peppers");
    // const onions = document.getElementById("Onions");

    // const selectedToppings = [];
    // if (pepperoni.checked) selectedToppings.push(pepperoni.value);
    // if (sausage.checked) selectedToppings.push(sausage.value);
    // if (blackOlives.checked) selectedToppings.push(blackOlives.value);
    // if (greenPeppers.checked) selectedToppings.push(greenPeppers.value);
    // if (onions.checked) selectedToppings.push(onions.value);

    const selectedCrust = document.querySelector(
      "input[name=crust]:checked"
    )?.value;

    const toppingsElements = document.querySelectorAll(
      "input[name=toppings]:checked"
    );

    const selectedToppings = [];
    toppingsElements.forEach((toppingElement) => {
      selectedToppings.push(toppingElement.value);
    });

    const specialInstructions = document.getElementById(
      "specialInstructions"
    ).value;

    addNewOrder({
      crust: selectedCrust,
      toppings: selectedToppings,
      instructions: specialInstructions,
    });
  }
});
