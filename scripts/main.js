import { getOrders, addNewOrder } from "./data.js";

document.getElementById("app").innerHTML = `
<h1 class="shop__title">Peanut's Sub Shop</h1>
<div>
  <h3>Please make your sub</h3>
  <div class="subForm">
      <div id="errors"></div>
    <div class="breadType">
      <p>Pick your bread [$3.99]</p>
      <label for="whiteBread">White Bread</label>
      <input id="whiteBread" name="breadType" type="radio" value="White Bread" />
      <label for="wheatBread">Wheat Bread</label>
      <input id="wheatBread" name="breadType" type="radio" value="Wheat Bread" />
      <label for="rosemaryParmesanBread">Rosemary Parmesan Bread</label>
      <input id="rosemaryParmesanBread" name="breadType" type="radio" value="Rosemary Parmesan Bread" />
      <label for="glutenFreeBread">Gluten Free Bread</label>
      <input id="glutenFreeBread" name="breadType" type="radio" value="Gluten Free Bread" />
      </div>
      <div class="proteinType">
      <p>Pick your protein  [$3.99]</p>
      <label for="grilledChicken">Grilled Chicken</label>
      <input id="grilledChicken" name="proteinType" type="radio" value="Grilled Chicken" />
      <label for="friedChicken">Fried Chicken</label>
      <input id="friedChicken" name="proteinType" type="radio" value="Fried Chicken" />
      <label for="grilledTurkey">Grilled Turkey</label>
      <input id="grilledTurkey" name="proteinType" type="radio" value="Grilled Turkey" />
      <label for="plantBased">Plant based protein...</label>
      <input id="plantBased" name="proteinType" type="radio" value="Plant based protein..." />
      </div>
      <div class="toppings">
        <p>Pick your Toppings (Select up to 3 toppings $1.99 each)</p>
        <ul>
          <li>
            <input id="redGreenPepperStrips" name="toppings" type="checkbox" 
            value="Red/Green Pepper Strips" />
            <label for="redGreenPepperStrips">Red/Green Pepper Strips</label>
          </li>
          <li>
            <input id="grilledOnions" name="toppings" type="checkbox" value="Grilled Onions" />
            <label for="grilledOnions">Grilled Onions</label>
          </li>
          <li>
            <input id="slicedTomatoes" name="toppings" type="checkbox" value="Sliced Tomatoes" />
            <label for="slicedTomatoes">Sliced Tomatoes</label>
          </li>
          <li>
            <input id="slicedPickles" name="toppings" type="checkbox" value="Sliced Pickles" />
            <label for="slicedPickles">Sliced Pickles</label>
          </li>
        </ul>
    </div>
        <div class="cheeseType">
      <p>Add Cheese? [$2.99]</p>
      <label for="pepperJack">Pepper Jack</label>
      <input id="pepperJack" name="cheeseType" type="radio" value="Pepper Jack" />
      <label for="provolone">Provolone</label>
      <input id="provolone" name="cheeseType" type="radio" value="Provolone" />
      <label for="swiss">Swiss Cheese</label>
      <input id="swiss" name="cheeseType" type="radio" value="Swiss Cheese" />
      <label for="noCheese">No Cheese</label>
      <input id="noCheese" name="cheeseType" type="radio" value="No Cheese" checked="checked"/>
      </div>
    <div class="toasted">
      <p>Toasted?</p>
      <label for="yes">Yes</label>
      <input id="yes" name="toasted" type="radio" value="Yes" />
      <label for="no">No</label>
      <input id="no" name="toasted" type="radio" value="No" checked="checked" />
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

const displayErrorMessage = (messagesArray) => {
  const errorHtml = document.getElementById("errors");
  let errorInnerHtml = `<p>Please correct the below errors</p><ul>`;
  for (const message of messagesArray) {
    errorInnerHtml += `<li>${message}</li>`;
  }
  errorInnerHtml += `</ul>`;
  errorHtml.innerHTML = errorInnerHtml;
};

const displayOrders = () => {
  let ordersHtml = `<div><table><thead><tr>
    <th>Order ID</th>
    <th>Bread</th>
    <th>Protein</th>
    <th>Toppings</th>
    <th>Cheese</th>
    <th>Toasted?</th>
    <th>Special Instructions</th>
    <th>Price</th>
  </tr></thead><tbody>`;
  const orders = getOrders();
  orders.sort((a, b) => b.id - a.id);
  // Add logic here to put the orders on the DOM
  for (const order of orders) {
    ordersHtml += `<tr><td>${order.id}</td>
    <td>${order.bread}</td>
    <td>${order.protein}</td>
    <td>${order.toppings.join(", ")}</td>
    <td>${order.cheese}</td>
    <td>${order.toasted}</td>
    <td>${order.instructions}</td>
    <td>$${order.totalPrice}</td></tr>`;
  }
  ordersHtml += `</tbody></table>`;
  document.getElementById("orders").innerHTML = ordersHtml;
};

const resetOrderSubForm = () => {
  document.querySelector("input[name=breadType]").checked = false;
  document.querySelector("input[name=proteinType]").checked = false;
  document
    .querySelectorAll("input[name=toppings]")
    .forEach((x) => (x.checked = false));
  document.getElementById("specialInstructions").value = "";
};

displayOrders();

document.addEventListener("newOrder", (event) => {
  displayOrders();
  resetOrderSubForm();
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
    const selectedCheeseType = document.querySelector(
      "input[name=cheeseType]:checked"
    )?.value;

    const selectedToastedOption = document.querySelector(
      "input[name=toasted]:checked"
    )?.value;

    const specialInstructions = document.getElementById(
      "specialInstructions"
    ).value;

    const errorMessages = [];
    if (!selectedBreadType) errorMessages.push("please select a bread");
    if (!selectedProteinType) errorMessages.push("please select a protein");
    if (selectedToppings.length === 0)
      errorMessages.push("please select a topping");
    if (selectedToppings.length > 3)
      errorMessages.push("please select max 3 toppings only");
    if (!selectedCheeseType)
      errorMessages.push("please select a cheese option");
    if (!selectedToastedOption)
      errorMessages.push("please select a toast option");

    if (errorMessages.length === 0) {
      const totalPrice =
        3.99 +
        3.99 +
        selectedToppings.length * 1.99 +
        (selectedCheeseType === "No Cheese" ? 0.0 : 2.99);

      addNewOrder({
        bread: selectedBreadType,
        protein: selectedProteinType,
        toppings: selectedToppings,
        cheese: selectedCheeseType,
        toasted: selectedToastedOption,
        instructions: specialInstructions,
        totalPrice: Math.round((totalPrice + Number.EPSILON) * 100) / 100,
      });
    } else displayErrorMessage(errorMessages);
  }
});
