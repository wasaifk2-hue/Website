
function addToCart(name, price) {
  var cart = localStorage.getItem("cart");

  if (cart == null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  cart[cart.length] = name + "|" + price;
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(name + " added to cart!");
  updateBadge();
}

function updateBadge() {
  var cart = localStorage.getItem("cart");
  var badge = document.getElementById("cartBadge");

  if (badge == null) return;

  if (cart == null) {
    badge.style.display = "none";
    return;
  }

  cart = JSON.parse(cart);

  if (cart.length > 0) {
    badge.textContent = cart.length;
    badge.style.display = "inline";
  } else {
    badge.style.display = "none";
  }
}

function loadCart() {
  var list = document.getElementById("cartItems");
  if (list == null) return;

  var cart = localStorage.getItem("cart");
  var total = 0;

  if (cart == null || JSON.parse(cart).length == 0) {
    document.getElementById("emptyCart").style.display = "block";
    document.getElementById("cartContent").style.display = "none";
    return;
  }

  cart = JSON.parse(cart);

  document.getElementById("emptyCart").style.display = "none";
  document.getElementById("cartContent").style.display = "block";

  list.innerHTML = "";

  for (var i = 0; i < cart.length; i++) {
    var parts = cart[i].split("|");
    var itemName = parts[0];
    var itemPrice = Number(parts[1]);

    total = total + itemPrice;

    var li = document.createElement("li");
    li.innerHTML = itemName + ' <span class="cart-item-price">$' + itemPrice + '</span> <button class="remove-btn" onclick="removeItem(' + i + ')">Remove</button>';
    list.appendChild(li);
  }

  document.getElementById("total").textContent = "$" + total;
  updateBadge();
}

function removeItem(index) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var newCart = [];

  for (var i = 0; i < cart.length; i++) {
    if (i != index) {
      newCart[newCart.length] = cart[i];
    }
  }

  localStorage.setItem("cart", JSON.stringify(newCart));
  loadCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
}

function handleContactForm(event) {
  event.preventDefault();
  document.getElementById("successMsg").style.display = "block";
  event.target.reset();
}

window.onload = function () {
  updateBadge();
  loadCart();

  var audio = document.querySelector(".about-audio audio");
  if (audio) {
    audio.volume = 0.15;
  }
};
