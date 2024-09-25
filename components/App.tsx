// App.tsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Cart from './Cart';
import { Product } from './product';

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 29.99,
      description: 'This is product 1 description',
      image: 'path/to/product1.jpg'
    },
    {
      id: 2,
      title: 'Product 2',
      price: 39.99,
      description: 'This is product 2 description',
      image: 'path/to/product2.jpg'
    }
    // Add more products here
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const handleProceedCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    // Implement actual checkout logic (e.g., payment gateway integration)
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onViewDetails={() => console.log('Viewing details for', product)}
          />
        ))}
      </div>

      <Cart cartItems={cartItems} onProceedCheckout={handleProceedCheckout} />
    </div>
  );
};

export default App;
