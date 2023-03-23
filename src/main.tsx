import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch";
import { CartContextProvider } from "./contexts/cart/CartContextProvider";
import { ProductContextProvider } from "./contexts/product/ProductContextProvider";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ProductContextProvider>
        <CartContextProvider>
          <RouteSwitch />
        </CartContextProvider>
      </ProductContextProvider>
    </React.StrictMode>
  );
}
