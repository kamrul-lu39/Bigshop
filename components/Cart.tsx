// components/Cart.tsx
import React from 'react';
import { Product } from '../types/product';
import styles from './Cart.module.css';

interface CartProps {
  cartItems: Product[];
  onProceedCheckout: () => void;
}

const Cart = ({ cartItems, onProceedCheckout }: CartProps) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <div>
                  <img src={item.image} alt={item.title} className={styles.cartImage} />
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <strong>Total: ${totalAmount}</strong>
          </div>
          <button className={styles.proceedCheckoutButton} onClick={onProceedCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
