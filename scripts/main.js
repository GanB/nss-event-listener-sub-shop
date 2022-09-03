import { getOrders, addNewOrder } from "./data.js";

document.getElementById("app").innerHTML = `
<h1 class="shop__title">Peanut's Sub Shop</h1>
<div>
  <h3>Please make your sub</h3>
  <div class="subForm">
    <div class="breadType">
      <p>Pick your bread</p>
      <label for="whiteBread">White Bread</label>
      <input id="whiteBread" name="breadType" type="radio" value="whiteBread" />
      <label for="wheatBread">Wheat Bread</label>
      <input id="wheatBread" name="breadType" type="radio" value="wheatBread" />
      <label for="rosemaryParmesanBread">Rosemary Parmesan Bread</label>
      <input id="rosemaryParmesanBread" name="breadType" type="radio" value="rosemaryParmesanBread" />
      <label for="glutenFreeBread">Gluten Free Bread</label>
      <input id="glutenFreeBread" name="breadType" type="radio" value="glutenFreeBread" />
      </div>
      <div class="proteinType">
      <p>Pick your protein</p>
      <label for="grilledChicken">Grilled Chicken</label>
      <input id="grilledChicken" name="proteinType" type="radio" value="grilledChicken" />
      <label for="friedChicken">Fried Chicken</label>
      <input id="friedChicken" name="proteinType" type="radio" value="friedChicken" />
      <label for="grilledTurkey">Grilled Turkey</label>
      <input id="grilledTurkey" name="proteinType" type="radio" value="grilledTurkey" />
      <label for="plantBased">Plant based protein...</label>
      <input id="plantBased" name="proteinType" type="radio" value="plantBased" />
      </div>
      <div class="toppings">
        <p>Pick your Toppings (Select all that apply)</p>
        <ul>
          <li>
            <input id="redGreenPepperStrips" name="toppings" type="checkbox" 
            value="redGreenPepperStrips" />
            <label for="redGreenPepperStrips">Red/Green Pepper Strips</label>
          </li>
          <li>
            <input id="grilledOnions" name="toppings" type="checkbox" value="grilledOnions" />
            <label for="grilledOnions">Grilled Onions</label>
          </li>
          <li>
            <input id="slicedTomatoes" name="toppings" type="checkbox" value="slicedTomatoes" />
            <label for="slicedTomatoes">Sliced Tomatoes</label>
          </li>
          <li>
            <input id="slicedPickles" name="toppings" type="checkbox" value="slicedPickles" />
            <label for="slicedPickles">Sliced Pickles</label>
          </li>
        </ul>
    </div>
    <div class="extras">
      <label for="specialInstructions">Special Instructions</label>
      <div>
        <textarea id="specialInstructions"></textArea>
      </div>
    </div>
    <div>
      <button id="placeOrder">Place Order</button>
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
    ordersHtml += `<li> Order ID ${order.id}: ${order.bread}, Protein: ${
      order.protein
    } with toppings: ${order.toppings.join(", ")} and special instructions: ${
      order.instructions
    } </li>`;
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
  //   resetPizzaForm();
});

document.addEventListener("click", (e) => {
  if (e.target.id === "placeOrder") {
    const selectedBreadType = document.querySelector(
      "input[name=breadType]:checked"
    )?.value;

    const selectedProteinType = document.querySelector(
      "input[name=proteinType]:checked"
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
      bread: selectedBreadType,
      protein: selectedProteinType,
      toppings: selectedToppings,
      instructions: specialInstructions,
    });
  }
});
