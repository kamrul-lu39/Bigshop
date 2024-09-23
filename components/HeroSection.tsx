import React from 'react';
import styles from './HeroSection.module.css'; // Import CSS module for styling

const HeroSection = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroContent}>
        {/* Change the heading text */}
        <h1>Welcome to Our Winter Wonderland Sale!</h1>
        
        {/* Change the paragraph text */}
        <p>Get Up to 50% Off on Selected Items</p>
        
        <div className={styles.buttonContainer}>
          {/* Change button text */}
          <button className={styles.primaryButton}>Explore Deals</button>
          <button className={styles.secondaryButton}>Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
