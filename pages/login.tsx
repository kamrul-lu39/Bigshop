import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link'; // For navigation (Go Back)
import { FaArrowLeft } from 'react-icons/fa'; // Left arrow icon
import styles from '../components/AuthPage.module.css'; // Assuming this is your styles

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and signup

  return (
    <div className={styles.authContainer}>
      {/* Background overlay */}
      <div className={styles.authBackground}></div>

      {/* Form content */}
      <div className={styles.authBox}>
        {/* Go Back button INSIDE the card */}
        <div className={styles.goBackWrapper}>
          <Link href="/" passHref>
            <FaArrowLeft className={styles.goBackButton} /> {/* Left arrow icon */}
          </Link>
        </div>

        {/* Conditionally render the forms based on isSignUp state */}
        {!isSignUp ? (
          // Login form
          <>
            <h2>Sign In</h2>
            <form>
              <input type="text" placeholder="Username" required className={styles.inputField} />
              <input type="password" placeholder="Password" required className={styles.inputField} />
              <button type="submit" className={styles.submitButton}>Sign In</button>
            </form>
            <hr />
            <button onClick={() => signIn('google')} className={styles.googleButton}>Sign In with Google</button>
            <p>
              Don’t have an account?{' '}
              <button className={styles.switchButton} onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          // Sign Up form
          <>
            <h2>Sign Up</h2>
            <form>
              <input type="text" placeholder="Username" required className={styles.inputField} />
              <input type="email" placeholder="Email" required className={styles.inputField} />
              <input type="password" placeholder="Password" required className={styles.inputField} />
              <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
            <hr />
            <button onClick={() => signIn('google')} className={styles.googleButton}>Sign Up with Google</button>
            <p>
              Already have an account?{' '}
              <button className={styles.switchButton} onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
