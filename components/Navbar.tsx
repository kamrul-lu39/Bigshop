import React from 'react';
import Link from 'next/link'; // For page navigation
import styles from './Navbar.module.css'; // Import your styles
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon from Font Awesome
import { signOut, useSession } from 'next-auth/react';

interface NavbarProps {
  cartItemCount: number; // Prop to pass the cart item count
}

const Navbar = ({ cartItemCount }: NavbarProps) => {
  const { data: session } = useSession(); // Retrieve session data from NextAuth

  return (
    <nav className={styles.navbar}>
      {/* Branding */}
      <div className={styles.navbarBrand}>
        <h1 className={styles.brand}>MegaShop</h1>
      </div>

      {/* Navigation Links */}
      <ul className={styles.navLinks}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Shop</Link></li> {/* Update "Shop" to go to "/products" */}
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      {/* Cart and User Actions */}
      <div className={styles.navActions}>
        {/* Cart Icon with Item Count */}
        <div className={styles.cartContainer}>
          <Link href="/cart">
            <FaShoppingCart className={styles.cartIcon} />
          </Link>
          {cartItemCount > 0 && (
            <span className={styles.cartCount}>{cartItemCount}</span>
          )}
        </div>

        {/* User Session */}
        {session ? (
          <div className={styles.userInfo}>
            <span>Welcome, {session.user?.name}!</span>
            <button className={styles.signoutButton} onClick={() => signOut()}>Sign Out</button>
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link href="/login">
              <button className={styles.loginButton}>Sign In</button>
            </Link>
            <Link href="/login">
              <button className={styles.signupButton}>Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
