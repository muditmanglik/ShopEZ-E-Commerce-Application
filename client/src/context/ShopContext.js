import { createContext } from "react";

export const ShopContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  decreaseQuantity: async () => {},
  clearCart: async () => {},
  placeOrder: async () => {},
});
