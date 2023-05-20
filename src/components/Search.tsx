import { ChangeEvent } from "react";
import { SearchProps } from "../types/interface";

export const Search = ({ products, handleSearch }: SearchProps) => {
  const searchShop = (inputItem?: string) => {
    if (inputItem) {
      const filteredProductList = products.filter((item) =>
        item.itemName.toLowerCase().includes(inputItem.toLowerCase())
      );
      handleSearch(inputItem, filteredProductList);
    } else {
      handleSearch(inputItem, products);
    }

    //if not found will return empty
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchShop(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    searchShop(pastedText);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <input
          type="text"
          id="quantity"
          name="quantity"
          className="border-round w-full rounded-lg text-xl lg:w-80 lg:text-base"
          required
          maxLength={30}
          placeholder="Shopska Salad ..."
          onPaste={handlePaste}
          onChange={handleChange}
        ></input>
        <button
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary-500 px-8 py-2 text-center text-xl font-medium text-white hover:bg-secondary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 md:w-80 md:py-4 lg:w-40 lg:py-2.5 lg:text-base"
          onClick={() => searchShop()}
        >
          Search
        </button>
      </div>
    </>
  );
};
