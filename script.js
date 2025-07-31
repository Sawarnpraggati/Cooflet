document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalBillingContainer = document.querySelector('.total-billing');

    // Function to create HTML structure for each cart item
    function createCartItemElement(item) {
        const cartItemElement = document.createElement('li');
        cartItemElement.classList.add('list-group-item', 'cart-item');
        cartItemElement.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                    <span>${item.title} - ${item.quantity} x $${item.price.toFixed(2)} = $${item.totalPrice.toFixed(2)}</span>
                </div>
                <button class="btn btn-danger btn-sm remove-item">Remove</button>
            </div>
        `;
        cartItemElement.querySelector('.remove-item').addEventListener('click', () => {
            removeItemFromCart(item);
        });
        return cartItemElement;
    }

    // Function to display all cart items
    function displayCartItems(cartItems) {
        if (!cartItemsContainer) {
            console.error('Cart items container not found.');
            return;
        }

        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const cartItemElement = createCartItemElement(item);
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    // Function to update total billing
    function updateTotalBilling(cartItems) {
        let totalBilling = 0;
        cartItems.forEach(item => {
            totalBilling += item.totalPrice;
        });
        totalBillingContainer.innerText = `Total Billing: $${totalBilling.toFixed(2)}`;
    }

    // Function to remove an item from the cart
    function removeItemFromCart(itemToRemove) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.title !== itemToRemove.title);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(cartItems);
        updateTotalBilling(cartItems);
    }

    // Function to handle adding an item to the cart
    function addToCart(item) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(cartItems);
        updateTotalBilling(cartItems);
    }

    // Event listener for "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const title = card.querySelector('.card-title').innerText;
            const price = parseFloat(card.querySelector('.card-price').innerText.replace('$', ''));
            const quantity = parseInt(card.querySelector('.quantity-input').value);
            const image = card.querySelector('.card-img-top').src;
            const totalPrice = price * quantity;

            const cartItem = {
                title,
                price,
                quantity,
                image,
                totalPrice
            };

            addToCart(cartItem);
        });
    });

    // Display cart items and total billing on page load
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    displayCartItems(cartItems);
    updateTotalBilling(cartItems);
});
<!-- JAVASCRIPT FOR SEARCH BAR OF COFFEE OPTIONS-->
<script>
    function showCoffeeDetails(title, description, imgSrc) {
        document.getElementById('coffee-details-title').innerText = title;
        document.getElementById('coffee-details-description').innerText = description;
        document.getElementById('coffee-details-img').src = imgSrc;
        document.getElementById('coffee-details').style.display = 'block';
    }
