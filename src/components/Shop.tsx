// import { products } from "../utilities/product-list";
import ItemDetail from "./ItemDetail";
import { Search } from "./Search";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../contexts/product/ProductContextProvider";

const Shop = () => {
  const { products } = useContext(ProductContext);
  const [inputField, setInputField] = useState("");
  const [filteredList, setFilteredList] = useState(products);

  useEffect(() => {
    setFilteredList(products);
  }, [products]);

  return (
    <>
      <section className="w-full bg-secondary-900 py-10 pt-24 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-sm px-8 py-10 sm:py-16 lg:max-w-screen-xl lg:px-6">
          <div className="max-w-screen-sm">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white lg:text-4xl">
              Shop Bulgarian Bites
            </h2>
            <p className="mb-8 text-xl font-light text-secondary-200 dark:text-gray-400 lg:text-xl">
              Explore the delicious and rich flavors of Bulgarian cuisine. Bring
              home authentic Bulgarian dishes today!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Search
                handleSearch={(inputItem, filteredProducts) => {
                  setInputField(inputItem ?? "");
                  setFilteredList(filteredProducts);
                }}
                products={products}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900">
        <div className="container mx-auto grid h-auto min-h-[70vh] max-w-screen-md gap-5 px-8 lg:mb-10 lg:max-w-screen-xl lg:p-6">
          <div className="grid gap-10 pb-12 pt-12 sm:grid-cols-1 lg:grid-cols-4 lg:pb-12">
            {filteredList.map((product) => {
              return (
                <div key={product.id}>
                  <ItemDetail
                    product={product}
                    cardClass={
                      "grid grid-cols-1 lg:h-[26rem] flex flex-col h-full"
                    }
                    aTagClass={"lg:flex-1/3 lg:block"}
                    flexClass1={"lg:flex-2/3"}
                    flexClass2={"lg:flex-1/2"}
                    flexClass3={"lg:flex-1/4"}
                    buttonDivClass={
                      "left-1/2 lg:w-1/2 lg:left-1/2 lg:flex lg:w-full lg:-translate-x-1/2 lg:transform lg:flex-col"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
