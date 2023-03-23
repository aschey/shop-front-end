import { CartItem } from "./interface";

export type Testimonial = {
  quote: string;
  author: string;
  location: string;
};

export type NavigationList = [{ name: string; to: string; current: boolean }];

export type CartState = {
  cartItems: CartItem[];
  itemCount: number;
  totalPrice: string;
  checkout?: boolean;
  userId?: string;
};

export type CartAction =
  | { type: "REMOVE_ITEM"; payload: CartItem }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "INCREASE_QTY"; payload: CartItem }
  | { type: "DECREASE_QTY"; payload: CartItem }
  | { type: "CLEAR" };

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (payload: CartItem) => void;
  removeFromCart: (payload: CartItem) => void;
  increaseQty: (payload: CartItem) => void;
  decreaseQty: (payload: CartItem) => void;
  clearCart: () => void;
  userId?: string | null;
  itemCount?: number;
  totalPrice?: string;
  checkout?: boolean;
};
