// pages/index.tsx
import { GetStaticProps } from 'next';
import axios from 'axios';
import { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'; // Import the HeroSection component
import styles from '../styles/Home.module.css';

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  return (
    <>
      <Navbar />
      <HeroSection /> {/* This is the new hero section */}
      
      <div className={styles.container}>
        <h1>Featured Product</h1>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

// Fetch product data from Fake Store API
export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return {
    props: {
      products: res.data,
    },
  };
};

export default Home;
