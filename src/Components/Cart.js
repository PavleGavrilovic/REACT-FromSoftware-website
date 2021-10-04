import React, { Component } from "react";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty("fromArr") === false) {
      this.setState({
        content: "Your Cart is Empty",
      });
    } else {
      this.setState({
        content: "",
      });
      let storageArrNotUnique = JSON.parse(localStorage.getItem("fromArr"));

      const storageArr = Array.from(
        new Set(storageArrNotUnique.map((a) => a.id))
      ).map((id) => {
        return storageArrNotUnique.find((a) => a.id === id);
      });
      console.log(storageArr);

      document.getElementById(
        "cartPlaceholder"
      ).innerHTML = `<table id="cartTable"></table>`;
      document.getElementById("cartTable").innerHTML = `
      <tr>
      <th class="theadFirst">Product</th>
      <th>Type</th>
      <th>Quantity</th>
      <th>Price</th>
      <th></th>
      </tr>
      
      `;

      storageArr.forEach((element) => {
        document.getElementById("cartTable").innerHTML += `
        <tr data-id=${element.id} class="cart-items">
          <td>
          <h5>
            ${element.name} (${element.year})
          </h5>
          <img src=${element.image} alt="gameImg" class="cartImg"></img>
        </td>
        <td>${element.type}</td>
        <td><input class="number" type="number" value="1" min="1"></td>
        <td class="price">$${element.price}</td>
        <td><button class="removeBtn">Remove Item</button></td>
        </tr>
        
        `;
      });

      let priceTotal = [];

      for (let i = 0; i < storageArr.length; i++) {
        priceTotal.push(storageArr[i].price);
      }

      document.getElementById("cartTable").innerHTML += `
      <tr id="priceTotal">
      <td colspan="3">Total: </td>
      <td colspan="2" class="total">$${priceTotal.reduce((a, b) => a + b)}</td>
      </tr>
      `;

      function updatePrice() {
        let table = document.getElementById("cartTable");
        let cartItems = table.getElementsByClassName("cart-items");
        let sum = 0;
        for (let i = 0; i < cartItems.length; i++) {
          let priceE = cartItems[i].querySelector(".price").innerText;
          let price = parseFloat(priceE.replace("$", ""));

          let quantity = cartItems[i].querySelector(".number").value;
          sum = sum + price * quantity;
        }
        document.getElementById("priceTotal").innerHTML = `
        
        <td colspan="3">Total: </td>
        <td colspan="2" class="total">$${sum}</td>
        
        `;
      }

      let removeBtn = document.getElementsByClassName("removeBtn");

      for (let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener("click", removeItem);
      }

      function removeItem(event) {
        let button = event.target;
        button.parentElement.parentElement.remove();

        let idRemove = event.target.parentElement.parentElement.dataset.id;
        let find = storageArr.find(function (param) {
          if (Number(idRemove) === param.id) {
            return param;
          } else {
            return null;
          }
        });

        storageArr.splice(storageArr.indexOf(find), 1);

        localStorage.setItem("fromArr", JSON.stringify(storageArr));
        let cartItems = document.getElementsByClassName("cart-items");
        console.log(cartItems);

        if (cartItems.length === 0) {
          document.getElementById(
            "cartPlaceholder"
          ).innerHTML = `Your Cart is Empty.<br><br><br> Returning to Home Page...`;
          localStorage.removeItem("fromArr");
          setTimeout(function () {
            window.location.href = "Home.js";
          }, 1000);
        }

        updatePrice();
      }

      let quantity = document.getElementsByClassName("number");

      for (let i = 0; i < quantity.length; i++) {
        quantity[i].addEventListener("change", changeQuantity);
      }

      function changeQuantity(event) {
        let input = event.target;

        if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
        }
        updatePrice();
      }

      document.getElementById(
        "buttonWrapper"
      ).innerHTML += `<button class="cartBtn" id="purchaseBtn">Purchase</button>`;
      document
        .getElementById("purchaseBtn")
        .addEventListener("click", function () {
          localStorage.removeItem("fromArr");
          document.getElementById("buttonWrapper").innerHTML = "";
          document.getElementById("cartPlaceholder").innerHTML =
            "Thank You for your Purchase!";
        });
    }
  }

  render() {
    return (
      <div>
        <h1 className="pageHeader">Your Cart</h1>
        <div id="cartPlaceholder">{this.state.content}</div>
        <div id="buttonWrapper"></div>
      </div>
    );
  }
}

export default Cart;
