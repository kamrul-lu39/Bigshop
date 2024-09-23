import { useContext } from 'react';
import CartContext from '../context/CartContext';
import Stripe from 'stripe';
import { useEffect, useState } from 'react';

const stripe = new Stripe('your-stripe-secret-key', { 
  apiVersion: '2024-06-20',
});

const Checkout = () => {
  const cartContext = useContext(CartContext);
  const [isBrowser, setIsBrowser] = useState(false);

  // Ensure we're in a browser environment
  useEffect(() => {
    setIsBrowser(true); // This ensures that we only interact with the DOM in the browser
  }, []);

  if (!cartContext) {
    return <p>Loading cart...</p>;
  }

  const { cartItems } = cartContext;

  const handleCheckout = async () => {
    if (!isBrowser) return;  // Ensure this is only called in the browser

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: 1,
        })),
        mode: 'payment',
        success_url: `${window.location.origin}/success`, // Ensure window is accessed only in browser
        cancel_url: `${window.location.origin}/cancel`,
      });

      if (session.url && isBrowser) {
        window.location.href = session.url;  // Only assign href in the browser
      }
    } catch (error) {
      console.error("Error during checkout: ", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Proceed to Payment</button>
    </div>
  );
};

export default Checkout;
