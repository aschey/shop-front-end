import { Dispatch, SetStateAction } from "react";

export interface SearchProps {
  inputField: string | null;
  setInputField: Dispatch<SetStateAction<string>>;
  products: Product[];
  setFilteredList: Dispatch<SetStateAction<Product[]>>;
}

export interface Product {
  id: string;
  itemName: string;
  itemDescription: string;
  bulgarianName: string;
  imageId: Array<string>;
  qty: number;
  price: number;
  stripePriceId: string;
  stripeProductId: string;
}

export interface CartItem {
  id: string;
  itemName: string;
  qty: number;
  price: number;
  stripePriceId: string;
  stripeProductId: string;
}

export interface SysMsg {
  statusCode: number | string;
  message: string;
}
