import { GetStaticProps } from 'next';
import axios from 'axios';
import { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

interface ProductsProps {
  products: Product[];
}

const AllProducts = ({ products }: ProductsProps) => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.heading}>Featured Products</h1>
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

export default AllProducts;
