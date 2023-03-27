import { useReducer, ReactNode } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { sumItems } from "./CartReducer";
import { CartItem } from "../../types/interface";
import { CartState, CartAction } from "../../types/type";

//Local Storage
const storage = (() => {
  const item = localStorage.getItem("cartItems");
  return item ? JSON.parse(item) : [];
})();

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   Initial State of the cart
  const initialState = {
    cartItems: storage,
    ...sumItems(storage),
    checkout: false,
    userId: "testuser",
  };

  //Set up the reducer
  const [state, dispatch] = useReducer(CartReducer, initialState);

  //Function to handle when an item is added from the store into the Cart
  const addToCart = (payload: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload });
  };

  //Function to handle when an item that is in the cart is added again
  const increaseQty = (payload: CartItem) => {
    dispatch({ type: "INCREASE_QTY", payload });
  };

  //Function to handle when an item is removed from the cart
  const decreaseQty = (payload: CartItem) => {
    dispatch({ type: "DECREASE_QTY", payload });
  };

  //Function to remove an item from the cart
  const removeFromCart = (payload: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  //Function to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    //Add the functions that have been defined above into the Context provider, and pass on to the children
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        userId: state.userId,
        totalPrice: state.totalPrice,
        itemCount: state.itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
