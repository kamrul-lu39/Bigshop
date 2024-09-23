// components/ProductCard.tsx
import { Product } from '../types/product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <div className={styles.cardContent}>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p>{product.description.slice(0, 100)}...</p>
      </div>
    </div>
  );
};

export default ProductCard;
