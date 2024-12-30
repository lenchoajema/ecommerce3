import React from "react";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Product 1", price: 29.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 49.99, quantity: 2 },
  ];

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
