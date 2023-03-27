// import { products } from "../utilities/product-list";
import ItemDetail from "./ItemDetail";
import { Search } from "./Search";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../contexts/product/ProductContextProvider";

const Shop = () => {
  const { products, addProduct } = useContext(ProductContext);
  const [inputField, setInputField] = useState("");
  const [filteredList, setFilteredList] = useState(products);

  useEffect(() => {
    setFilteredList(products);
  }, [products]);

  return (
    <>
      <section className="w-full bg-secondary-900 pt-14 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 sm:py-16 lg:px-6">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
              Shop Bulgarian Bites
            </h2>
            <p className="mb-8 font-light text-secondary-200 dark:text-gray-400 sm:text-xl">
              Explore the delicious and rich flavors of Bulgarian cuisine. Bring
              home authentic Bulgarian dishes today!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Search
                inputField={inputField}
                setInputField={setInputField}
                products={products}
                setFilteredList={setFilteredList}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900">
        <div className="container mx-auto h-auto min-h-[70vh] max-w-screen-xl p-4 lg:p-6">
          <div className="grid gap-10 pt-12 pb-12 md:grid-cols-3 lg:grid-cols-4 lg:pb-12">
            {filteredList.map((product) => {
              return (
                <div key={product.id}>
                  <ItemDetail
                    product={product}
                    cardClass={
                      "sm:h-[40rem] md:h-[24rem] lg:h-[26rem] sm:flex-col"
                    }
                    aTagClass={"flex-1/3 block"}
                    flexClass1={"flex-2/3"}
                    flexClass2={"flex-1/2"}
                    flexClass3={"flex-1/4"}
                    itemDescription={product.itemDescription}
                    buttonDivClass={
                      "left-1/2 flex w-full -translate-x-1/2 transform flex-col"
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
