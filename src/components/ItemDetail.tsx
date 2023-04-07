import React, { useState, useContext } from "react";
import { Product, CartItem } from "../types/interface";
import CartContext from "../contexts/cart/CartContext";

//destructuring syntax for typescript is different
export default function ItemDetail({
  product,
  cardClass,
  aTagClass,
  flexClass1,
  flexClass2,
  flexClass3,
  buttonDivClass,
}: {
  product: Product;
  cardClass: string;
  aTagClass: string;
  flexClass1: string;
  flexClass2: string;
  flexClass3: string;
  buttonDivClass: string;
}) {
  const {
    id,
    itemName,
    imageId,
    price,
    bulgarianName,
    stripePriceId,
    stripeProductId,
    itemDescription,
  } = product;

  const { addToCart, increaseQty, decreaseQty, cartItems, removeFromCart } =
    useContext(CartContext);

  // Check whether the product is in the cart to show existing quantity
  const isInCart = (product: Product) => {
    return !!cartItems.find((item: CartItem) => item.id === product.id);
  };

  const currentCartItemQty = (product: Product) => {
    const currentItem = cartItems.filter(
      (item: CartItem) => item.id === product.id
    )[0];
    if (currentItem) {
      return currentItem.qty;
    }
  };

  return (
    <div
      className={`data-id=${id} relative items-center rounded-lg bg-gray-50 shadow-lg dark:border-gray-700 dark:bg-gray-800 lg:shadow-sm ${cardClass}`}
    >
      <a className={`md:relative md:inline-block ${aTagClass}`}>
        <img
          // className="w-full rounded-lg sm:rounded-lg"
          className="h-[34rem] rounded-t-lg object-fill sm:w-full sm:rounded-lg lg:h-[13rem] lg:w-[18rem]"
          src={
            imageId[0] ||
            "https://a-z-animals.com/media/2022/12/shutterstock_583277200.jpg"
          }
          alt={itemName}
        />

        <div className="align-items absolute inset-0 h-full px-5 py-3 text-center text-xl text-white transition-opacity duration-300 sm:bg-transparent md:flex md:bg-black md:opacity-0 hover:md:opacity-60">
          <p className="hidden self-center italic md:block">
            {itemDescription}
          </p>
        </div>
      </a>

      <div
        className={`${flexClass1} block h-full flex-col justify-between p-8 sm:pb-28`}
      >
        <div className={`${flexClass2} flex justify-between`}>
          <h3 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-xl">
            <a href="#">{itemName}</a>
          </h3>
          <h3 className="text-4xl lg:text-lg">${price}</h3>
        </div>
        <span
          className={`${flexClass3} text-4xl italic text-gray-500 dark:text-gray-400 lg:text-lg`}
        >
          {bulgarianName}
        </span>

        {/* only show itemDescription on screen on mobile */}
        <p className="block self-center py-4 text-3xl italic text-gray-500 lg:hidden lg:text-lg">
          {itemDescription}
        </p>
      </div>
      {/* --------------add to cart button START-------------- */}
      <div
        className={`${buttonDivClass} bottom-4 mb-10 flex justify-center lg:absolute lg:right-0 lg:mb-0`}
        // className={`absolute bottom-4 right-0 flex w-1/2 justify-center`}
      >
        {!isInCart(product) || currentCartItemQty(product) === 0 ? (
          <div className="mt-auto flex w-full items-center justify-center">
            <button
              onClick={() => {
                addToCart(product);
              }}
              className="border-lg mt-auto flex h-20 w-[70%] items-center justify-center gap-2 rounded-full border border-gray-200 bg-secondary-500 text-3xl text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white lg:h-10 lg:text-lg"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-10 w-10 lg:h-6 lg:w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add To Cart
            </button>
          </div>
        ) : (
          <div className="mt-auto flex h-auto items-stretch justify-center">
            <button
              className="rounded-lg rounded-r-none border border-gray-200 bg-secondary-500 px-2 py-1 text-6xl text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white lg:text-lg"
              onClick={() => {
                decreaseQty(product);
              }}
            >
              -
            </button>
            <span className="flex h-20 items-center bg-secondary-100 px-20 py-1 text-3xl lg:h-10 lg:px-10 lg:text-lg">
              {isInCart(product) && currentCartItemQty(product)
                ? currentCartItemQty(product)
                : 0}
            </span>
            <button
              onClick={() => {
                increaseQty(product);
              }}
              className={`rounded-lg rounded-l-none border border-gray-200 bg-secondary-500 px-2 py-1 text-6xl text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white lg:text-lg`}
            >
              +
            </button>
          </div>
        )}
      </div>
      {/* --------------add to cart button END-------------- */}
    </div>
  );
}
