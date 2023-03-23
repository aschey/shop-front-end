import { createContext } from "react";
import { CartContextType } from "../../types/type";

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  clearCart: () => {},
  userId: null,
  totalPrice: "",
  itemCount: 0,
});

export default CartContext;
