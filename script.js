
let ShoppingCart = (function($) {
  "use strict";

  // Cahce necesarry DOM Elements
  let productsEl = document.querySelector(".products"),
      cartEl =     document.querySelector(".shopping-cart-list"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".cart-checkout"),
      totalPriceEl = document.querySelector(".total-price");

  // "Fake" JSON data array here should be API call
  let products = [
    {
      id: 0,
      name: "Alexander AL 822 E451",
      description: "Saulės akiniai",
      imageUrl: "./image/1.jpg",
      price: 149
    },
    {
      id: 1,
      name: "Belutti SBC 125 C01",
      description: "Saulės akiniai",
      imageUrl: "./image/2.jpg",
      price: 349,
    },
    {
      id: 2,
      name: "Belutti SBC 164 02",
      description: "Saulės akiniai",
      imageUrl: "./image/3.jpg",
      price: 249
    },
    {
      id: 3,
      name: "Emporio Armani EA 200",
      description: "Saulės akiniai",
      imageUrl: "./image/4.jpg",
      price: 289
    },
    {
      id: 4,
      name: "Loretto S EA 4097 C5",
      description: "Saulės akiniai",
      imageUrl: "./image/5.jpg",
      price: 299
    },
    {
      id: 5,
      name: "Loretto S GSA 8139 C5",
      description: "Saulės akiniai",
      imageUrl: "./image/6.jpg",
      price: 389
  },

    {
      id: 6,
      name: "Marc Jacobs MJSG 395",
      description: "Saulės akiniai",
      imageUrl: "./image/7.jpg",
      price: 279
  },

  {
    id: 7,
    name: "Moretti 8586 C1",
    description: "Saulės akiniai",
    imageUrl: "./image/8.jpg",
    price: 359
},
  {
    id: 8,
    name: "Oakley OO 9360 0358",
    description: "Saulės akiniai",
    imageUrl: "./image/9.jpg",
    price: 199
},
{
  id: 9,
  name: "Persol PS 3019S 95/31",
  description: "Saulės akiniai",
  imageUrl: "./image/10.jpg",
  price: 219
}
  ],


      productsInCart = [];

  // Product list in index page (piesia productu lista index page)
  let generateProductList = function() {
    products.forEach(function(item) {
      let productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `<div class="product-image">
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span>Product:</span> ${item.name}</div>
                             <div class="product-description"><span>Description:</span> ${item.description}</div>
                             <div class="product-price"><span>Price:</span> ${item.price} $</div>
                             <div class="product-add-to-cart">
                               <a href="#0" class="button see-more">More Details</a>
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;

productsEl.appendChild(productEl);
    });
  }

  // Like one before and I have also used ES6 template strings
  let generateCartList = function() {

    cartEl.innerHTML = "";

    productsInCart.forEach(function(item) {
      let li = document.createElement("li");
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
    });

    productQuantityEl.innerHTML = productsInCart.length;

    generateCartButtons()
}






  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function() {
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
      totalPriceEl.innerHTML = "$ " + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }

  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
       var elId = el.dataset.id;
       addToCart(elId);
      }
    });

    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Ar tikrai norite išvalyti pirkinių krepšelį?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }

  // Adds new items or updates existing one in productsInCart array
  let addToCart = function(id) {
    let obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();


  localStorage.setItem('productsInCart', JSON.stringify(productsInCart)); //isaugo localStorage cart
}

function load() { //istraukia is local storage cart 
    var storedValue = localStorage.getItem('productsInCart');
    if (storedValue) {

        productsInCart=JSON.parse(storedValue)
        generateCartList();
    }
}

window.addEventListener('load',load);
window.addEventListener('productsEl',productsEl);













  // This function checks if project is already in productsInCart array
  let productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.price *  item.quantity);
    }, 0);
  }

  // This functon starts the whole application
  var init = function() {
    generateProductList();
    setupListeners();
  }

  // Exposes just init function to public, everything else is private
  return {
    init: init
  };

  // I have included jQuery although I haven't used it
})();

ShoppingCart.init();


function myFunction() {
  let element = document.getElementById("myDiv");
   element.classList.toggle("shopping-cart-close");
   element.classList.toggle("shopping-cart");
}

document.getElementById("btn1").addEventListener("click", myFunction);


//nav menu hover


var test = document.getElementById("test");


// this handler will be executed only once when the cursor moves over the unordered list
test.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.color = "purple";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);


// this handler will be executed every time the cursor is moved over a different list item
test.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  event.target.style.color = "white";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);

// Load products
