import React from 'react';
import styles from './Navbar.module.css'; // Import the CSS module for styling
import { FaShoppingCart } from 'react-icons/fa'; // Import the Cart Icon from Font Awesome

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <h1 className={styles.brand}>MyShop</h1> {/* Change this to your brand name */}
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#home">Home</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className={styles.navActions}>
        <FaShoppingCart className={styles.cartIcon} /> {/* Cart Icon */}
        <button className={styles.loginButton}>Login</button>
        <button className={styles.signupButton}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
