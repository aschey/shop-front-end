import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../../types/interface";

//swap out products to get from the db instead of static product list. ONLY GET
//finish all routes? -- but some are admin only
type ProductContextType = {
  products: Product[];
  addProduct: (
    itemName: string,
    itemDescription: string,
    bulgarianName: string,
    imageId: string,
    price: number
  ) => void;
  // getProducts: () => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  // getProducts: () => {},
  // products: [];
  // addProduct: () => void;
  // // deleteAllproductsByUser: () => {},
  // // deleteIndividualProduct: () => {},
  // getProducts: () => void;
});

// const ProductContext = createContext();
export const useShopContext = () => useContext(ProductContext);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState([]);

  //gets products once from mongodb backend upon mounting
  useEffect(() => {
    console.log("getProduct");
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

  // const getProducts = async () => {
  //   console.log("getProduct");
  //   console.log(`${import.meta.env.VITE_BACKEND_DB_URL}/api/products`);
  //   const response = await axios.get(
  //     `${import.meta.env.VITE_BACKEND_DB_URL}/api/products`
  //   );

  //   // console.log(response);

  //   if (response.status === 200) {
  //     setProducts(response.data);
  //   } else {
  //     throw Error("no products");
  //   }
  // };

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
        // {
        //   headers: {
        //     Authorization: userIdToken,
        //   },
        // }
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
        // deleteAllproductsByUser,
        // deleteIndividualProduct,
        // getProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
