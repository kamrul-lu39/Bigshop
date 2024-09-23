import { GetStaticProps, GetStaticPaths } from 'next';
import axios from 'axios';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { Product } from '../../types/product';

interface ProductPageProps {
  product: Product;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <p>Loading cart context...</p>;  // Handle null context case more clearly
  }

  const { addToCart } = cartContext;

  if (!product) {
    return <p>Product not found</p>;  // Handle missing product case
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

// Fetch all product paths for static generation
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Using the Fake Store API for testing
    const res = await axios.get('https://fakestoreapi.com/products');
    const products: Product[] = res.data;

    const paths = products.map((product) => ({
      params: { id: product.id.toString() }, // Ensure 'id' is passed as a string
    }));

    return { paths, fallback: false }; // Only generate static pages for known products
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching products:', error.message);
    } else {
      console.error('Unknown error occurred while fetching products');
    }

    return {
      paths: [],
      fallback: false,
    };
  }
};

// Fetch product data for a specific product based on 'id'
export const getStaticProps: GetStaticProps<ProductPageProps> = async (context) => {
  const { params } = context;

  if (!params || typeof params.id !== 'string') {
    return {
      notFound: true, // Return a 404 page if id is invalid
    };
  }

  try {
    // Fetching product data from the Fake Store API
    const res = await axios.get(`https://fakestoreapi.com/products/${params.id}`);
    console.log(res.data);

    const product: Product = res.data;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching product:', error.message);
    } else {
      console.error('Unknown error occurred while fetching the product');
    }

    return {
      notFound: true, // Return a 404 page if there's an error fetching the product
    };
  }
};

export default ProductPage;
