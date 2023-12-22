window.addEventListener("load", (event) => {
  let cartIcon = document.querySelector("#cart_icon");
  let cart = document.querySelector(".cart");
  let closeCart = document.querySelector("#close-cart");

  // Open
  cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
  });
  //Close
  closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
  });

  // Cart Working
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  function ready() {
    // Remove Items from cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
      var button = removeCartButtons[i];
      button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener("change", quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
      var button = addCart[i];
      button.addEventListener("click", addCartClicked);
    }
    
  }
  
  function buyButtonClicked(event) {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
  }
  // Remove Items From Cart
  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
  }

  // Quantity Changes
  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateTotal();
  }
  // Add to cart
  function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement.parentElement.parentElement;
    var title =
      shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var shopProductsCard =
      button.parentElement.parentElement.parentElement.parentElement;
    var productImg =
      shopProductsCard.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
  }
  function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].innerText == title) {
        alert("You have already add this item to cart");
        return;
      }
    }
    var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- Remove Cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);
    cartShopBox
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);
  }
  let total = 0;
  // Update Total
  function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var products = [];
    for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var title =
        cartBox.getElementsByClassName("cart-product-title")[0].innerText;
      var priceElement = cartBox.getElementsByClassName("cart-price")[0];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
      const newProduct = { title: title, quantity: quantity, price: price };
      products.push(newProduct);
    }
    // If price contain some Cents Value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    // Open modal and update content when button is clicked
    document
      .getElementById("openModalBtn")
      .addEventListener("click", function () {
        updateModalContent(products, total);
      });
  }
  // Function to update modal content with dynamic data
  function updateModalContent(products, totalCost) {
    var productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = "";
    for (var i = 0; i < products.length; i++) {
      var product = products[i];

      var productDiv = document.createElement("div");
      productDiv.classList.add("product-info");

      var title = document.createElement("h6");
      title.textContent = "Product: " + product.title;

      var price = document.createElement("p");
      price.textContent = "Price: " + product.price;

      var quantity = document.createElement("p");
      quantity.textContent = "Quantity: " + product.quantity;

      productDiv.appendChild(title);
      productDiv.appendChild(price);
      productDiv.appendChild(quantity);

      // Thêm phần tử div chứa thông tin sản phẩm vào phần tử productDetails
      productDetails.appendChild(productDiv);
    }

    // Cập nhật tổng chi phí
    document.getElementById("totalCost").innerText =
      "Total Price: $" + totalCost;
  }
});
