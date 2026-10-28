const cart = [];

const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const openCartButton = document.getElementById("open-cart");
const closeCartButton = document.getElementById("close-cart");
const checkoutButton = document.getElementById("checkout-button");

// Open the shopping cart
openCartButton.addEventListener("click", function () {
    cartOverlay.classList.add("show");
});

// Close the shopping cart
closeCartButton.addEventListener("click", function () {
    cartOverlay.classList.remove("show");
});

// Close the cart when clicking outside the panel
cartOverlay.addEventListener("click", function (event) {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("show");
    }
});

// Add a product to the cart
document.querySelectorAll(".add-button").forEach(function (button) {
    button.addEventListener("click", function () {
        const id = button.dataset.id;

        const existingProduct = cart.find(function (item) {
            return item.id === id;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: id,
                name: button.dataset.name,
                price: Number(button.dataset.price),
                image: button.dataset.image,
                quantity: 1
            });
        }

        renderCart();

        button.textContent = "Added to Cart!";
        setTimeout(function () {
            button.textContent = "Add to Cart";
        }, 900);
    });
});

// Display the cart products and calculate the total
function renderCart() {
    cartItems.innerHTML = "";

    let totalQuantity = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';
    }

    cart.forEach(function (item) {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="">
            <div>
                <h3>${item.name}</h3>
                <p>${item.price} EGP</p>

                <div class="quantity-controls">
                    <button data-action="minus"
                        data-id="${item.id}" aria-label="Decrease quantity">−</button>

                    <span>${item.quantity}</span>

                    <button data-action="plus"
                        data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>

                <button class="remove-button"
                    data-action="remove" data-id="${item.id}">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = totalPrice + " EGP";
}

// Handle quantity buttons and remove buttons
cartItems.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = button.dataset.id;
    const action = button.dataset.action;

    const item = cart.find(function (product) {
        return product.id === id;
    });

    if (!item) {
        return;
    }

    if (action === "plus") {
        item.quantity++;
    }

    if (action === "minus") {
        item.quantity--;

        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            cart.splice(index, 1);
        }
    }

    if (action === "remove") {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }

    renderCart();
});

// Demo checkout
checkoutButton.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    alert(
        "Your cart total is " + cartTotal.textContent +
        ". This is a demo store, so your order has not been sent."
    );
});

renderCart();