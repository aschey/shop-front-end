import { ChangeEvent } from "react";
import { SearchProps, Product } from "../types/interface";

export const Search = ({
  inputField,
  setInputField,
  products,
  setFilteredList,
}: SearchProps) => {
  const searchShop = (inputItem: any) => {
    let filteredProductList = products;
    if (inputField) {
      filteredProductList = products.filter((item) =>
        item.itemName.toLowerCase().includes(inputItem.toLowerCase())
      );
    } else {
      setFilteredList(products);
    }

    setFilteredList(filteredProductList);

    //if not found will return empty
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputField(e.target.value);

    searchShop(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    setInputField(pastedText);
    searchShop(pastedText);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          id="quantity"
          name="quantity"
          className="border-round w-80 rounded-lg"
          required
          maxLength={30}
          placeholder="Shopska Salad ..."
          onPaste={handlePaste}
          onChange={handleChange}
        ></input>
        <button
          className="inline-flex w-40 items-center justify-center rounded-lg bg-primary-500 px-4 py-2.5 text-center text-base font-medium text-white hover:bg-secondary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          onClick={searchShop}
        >
          Search
        </button>
      </div>
    </>
  );
};
