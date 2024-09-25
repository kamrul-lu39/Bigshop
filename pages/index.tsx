import { GetStaticProps } from 'next';
import axios from 'axios';
import { useState } from 'react';
import { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'; // Import the HeroSection component
import Link from 'next/link'; // Import Link from next/link
import styles from '../styles/Product.module.css';
import { useRouter } from 'next/router'; // Use Next.js router for navigation

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  const itemsPerPage = 6; // 6 items per page (2 rows of 3)
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  const router = useRouter();

  // Function to handle viewing product details
  const handleViewDetails = (product: Product) => {
    // For example, navigate to a product details page
    router.push(`/products/${product.id}`);
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Handle Next Page
  const handleNextPage = () => {
    if (indexOfLastItem < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar />
      <HeroSection /> {/* Hero section */}

      <div className={styles.container}>
        <h1>Featured Products</h1>

        {/* Render current set of products */}
        <div className={styles.productGrid}>
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails} // Pass the function as prop
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={indexOfLastItem >= products.length}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>

        {/* View All Products Button */}
        <div className={styles.viewAllContainer}>
          <Link href="/products">
            <button className={styles.viewAllButton}>View All Products</button>
          </Link>
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
