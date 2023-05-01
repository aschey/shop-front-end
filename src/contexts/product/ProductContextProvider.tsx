import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../../types/interface";

//TODO: finish all routes
type ProductContextType = {
  products: Product[];
  addProduct: (
    itemName: string,
    itemDescription: string,
    bulgarianName: string,
    imageId: string,
    price: number
  ) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
});

export const useShopContext = () => useContext(ProductContext);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState([]);

  //gets products once from mongodb backend upon mounting
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DB_URL}/api/products`
      );
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        throw Error("no products");
      }
    }
    getProducts();
  }, []);

  const addProduct = async (
    itemName: string,
    itemDescription: string,
    bulgarianName: string,
    imageId: string,
    price: number
  ) => {
    try {
      return await axios.post(
        `${import.meta.env.VITE_BACKEND_DB_URL}/api/products/add`,
        {
          itemName,
          itemDescription,
          bulgarianName,
          imageId,
          price,
        }
      );
    } catch (error) {
      console.log(error);
      throw Error("Failed To Add Product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
