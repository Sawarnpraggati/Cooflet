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
        cartItems = cartItems.filter(item => !(item.title === itemToRemove.title && item.quantity === itemToRemove.quantity));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(cartItems);
        updateTotalBilling(cartItems);
    }

    // Display cart items and total billing on page load
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    displayCartItems(cartItems);
    updateTotalBilling(cartItems);
});
