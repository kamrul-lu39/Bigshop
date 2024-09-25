import { Product } from '../types/product';
import styles from './ProductCard.module.css';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Limit title to 30 characters and add ellipsis
  const shortTitle = product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title;

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{shortTitle}</h3>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.description}>{product.description.slice(0, 100)}...</p> {/* Short description */}
        <Link href={`/products/${product.id}`}>
          <button className={styles.detailsButton}>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
