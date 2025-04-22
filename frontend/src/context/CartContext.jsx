import React, { createContext, useState,useContext,useEffect } from 'react';

// Create Context
export const CartContext = createContext();

// Context Provider Component
export const CartProvider = ({ children }) => {
  const [isCart,setIsCart] = useState([]);
  useEffect(()=>{
    const exitCart=localStorage.getItem('cart');
    if(exitCart){
      setIsCart(JSON.parse(exitCart));
    }
  },[])

  return (
    <CartContext.Provider value={{ isCart, setIsCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);