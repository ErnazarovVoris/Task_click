import React, { useState, useEffect, useCallback } from "react";
import CartList from "./components/CartList";

export default function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = useCallback((product) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (exist) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }]; 
    });
  }, []);
  
  useEffect(() => {
    const handleProductAdded = (event) => {
      const product = event.detail.product; 
      addItemToCart(product);
    };

    window.addEventListener('productAddedToCart', handleProductAdded);

    return () => {
      window.removeEventListener('productAddedToCart', handleProductAdded);
    };
  }, [addItemToCart]);

  const increase = id => {
    setCart(prevCart => prevCart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decrease = id => {
    setCart(prevCart => prevCart.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  };

  const removeItem = id => {
    setCart(prevCart => prevCart.filter(item => 
      item.id !== id
    ));
  };


  return (
    <div className="cart-content">
        <h2>🛍️ Savat</h2> 
        <CartList
          cart={cart}
          increase={increase}
          decrease={decrease}
          removeItem={removeItem}
        />
    </div>
  );
}