// context/CartContext.tsx
import { createContext, useState, ReactNode } from 'react';
import { Product } from '../types/product';  // Import your Product type

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
