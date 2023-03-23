//Import the Action types
import {
  REMOVE_ITEM,
  ADD_TO_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  CLEAR,
} from "./CartTypes.js";
import { CartItem } from "../../types/interface";
import { CartState, CartAction } from "../../types/type";
import axios from "axios";

const Storage = (cartItems: CartItem[]) => {
  console.log("Save to storage");
  console.log(cartItems);
  localStorage.setItem(
    "cartItems",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

// Export function to calculate the total price of the cart and the total qty of the cart
export const sumItems = (cartItems: CartItem[]) => {
  console.log(" Sum Items And Save to localStorage");
  Storage(cartItems);
  let itemCount = cartItems.reduce((total, product) => total + product.qty, 0);
  let totalPrice = cartItems
    .reduce((total, product) => total + product.price * product.qty, 0)
    .toFixed(2);
  console.log(itemCount, totalPrice);
  return { itemCount, totalPrice };
};

// The reducer is listening for an action, which is the type that we defined in the CartTypes.js file
// const CartReducer = (state: CartState, action: CartAction) => {
const CartReducer: React.Reducer<CartState, CartAction> = (state, action) => {
  // The switch statement is checking the type of action that is being passed in
  console.log("cart reduce state:");
  console.log(state);
  let cartItems = [...state.cartItems];
  let itemIndex;

  switch (action.type) {
    // If the action type is ADD_TO_CART, we want to add the item to the cartItems array
    case ADD_TO_CART:
      console.log("cart - reducer add item to cart ");
      console.log(state, action);
      if (
        !state.cartItems.find((item: CartItem) => item.id === action.payload.id)
      ) {
        state.cartItems.push({
          ...action.payload,
          qty: 1,
          get subtotal() {
            return (this.price * this.qty).toFixed(2);
          },
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
        checkout: false,
      };

    // If the action type is REMOVE_ITEM, we want to remove the item from the cartItems array
    case REMOVE_ITEM:
      console.log("cart - reducer remove item to cart ");
      console.log(state, action);
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter(
            (item: CartItem) => item.id !== action.payload.id
          )
        ),
        cartItems: [
          ...state.cartItems.filter(
            (item: CartItem) => item.id !== action.payload.id
          ),
        ],
      };

    case INCREASE_QTY:
      console.log("cart - reducer  increase item qty ");
      // make a copy of the cart items array so we dont directly change state
      itemIndex = cartItems.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        console.log("item found in cart. adding qty");
        cartItems[itemIndex] = {
          ...cartItems[itemIndex],
          qty: cartItems[itemIndex].qty + 1,
        };
      }
      console.log(state);
      console.log(cartItems);
      return { ...state, cartItems, ...sumItems(cartItems) };

    case DECREASE_QTY:
      console.log("decrease item qty");
      itemIndex = cartItems.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );
      console.log(state);
      if (itemIndex >= 0) {
        cartItems[itemIndex] = {
          ...cartItems[itemIndex],
          qty: cartItems[itemIndex].qty - 1,
        }; //updated quantity

        if (cartItems[itemIndex].qty === 0) {
          console.log("cartItems[itemIndex].qty === 0");
          cartItems = cartItems.filter(
            (item: CartItem) => item.id !== action.payload.id
          ); //remove item from cart if qty is reduced to 0
        }
      }
      return { ...state, cartItems, ...sumItems(cartItems) };

    //If the action type is CLEAR, we want to clear the cartItems array
    case CLEAR:
      return {
        cartItems: [],
        ...sumItems([]),
      };

    //Return the state if the action type is not found
    default:
      return state;
  }
};

export default CartReducer;
