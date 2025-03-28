import { createContext, ReactNode, useContext, useState } from 'react';
import { cartItem } from '../types/cartItem'; // Importing CartItem type from types folder

interface CartContextType {
  cart: cartItem[]; // Array of cart items (many insiodqe the cart)
  addToCart: (item: cartItem) => void; // function to add item to cart, nothing will be returned
  removeFromCart: (projectId: number) => void; // function to remove item from cart, nothing will be returned
  clearCart: () => void;
  // establishing these functions in our page
}

const CartContext = createContext<CartContextType | undefined>(undefined); // create context with undefined type

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<cartItem[]>([]); // cart is an array of CartItem objects, initially empty
  // function to add item to cart

  const addToCart = (item: cartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.projectId === item.projectId); // check if item is already in cart)
      const updatedCart = prevCart.map((c) =>
        c.projectId === item.projectId
          ? { ...c, donationAmount: c.donationAmount + item.donationAmount }
          : c
      ); // if it is, update the donation amount)

      return existingItem ? updatedCart : [...prevCart, item]; // if it is, update the donation amount, otherwise add the new item to the cart
    });
    // [...prevCart, item]); // spread operator to add item to cart
    // take and spread the previous cart and add the new item to it
  };

  const removeFromCart = (projectId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.projectId !== projectId));
  };
  // remove item from cart, filter out the item with the given projectId
  //those what is remaining are those that AREN'T the projectId

  const clearCart = () => {
    setCart([]); // clear the cart by setting it to an empty array
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext); // use the context
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // if context is not defined, throw an error
  }

  return context; // return the context
};
