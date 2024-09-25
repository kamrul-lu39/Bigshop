import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import styles from '../components/AuthPage.module.css'; // Assuming this is your styles

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/login'); // Redirect to login page after successful registration
    } else {
      alert(data.message || 'Something went wrong!');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBackground}></div>

      <div className={styles.authBox}>
        <div className={styles.goBackWrapper}>
          <Link href="/" passHref>
            <FaArrowLeft className={styles.goBackButton} />
          </Link>
        </div>

        {!isSignUp ? (
          <>
            <h2>Sign In</h2>
            <form>
              <input type="text" placeholder="Username" required className={styles.inputField} />
              <input type="password" placeholder="Password" required className={styles.inputField} />
              <button type="submit" className={styles.submitButton}>Sign In</button>
            </form>
            <hr />
            <p>
              Don’t have an account?{' '}
              <button className={styles.switchButton} onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                className={styles.inputField}
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className={styles.inputField}
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className={styles.inputField}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
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
