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
  itemDescription,
  buttonDivClass,
}: {
  product: Product;
  cardClass: string;
  aTagClass: string;
  flexClass1: string;
  flexClass2: string;
  flexClass3: string;
  itemDescription: string;
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
  } = product;

  console.log("item detail");
  console.log(
    id,
    itemName,
    imageId,
    price,
    bulgarianName,
    stripePriceId,
    stripeProductId
  );

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
      className={`data-id=${id} relative items-center rounded-lg bg-gray-50 shadow dark:border-gray-700 dark:bg-gray-800 ${cardClass}`}
    >
      <a className={`${aTagClass} md:relative md:inline-block`}>
        <img
          // className="w-full rounded-lg sm:rounded-lg"
          className="rounded-t-lg object-fill sm:h-[24rem] sm:w-full sm:rounded-lg md:h-[13rem] md:w-[18rem]"
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
          <h3 className=" text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#">{itemName}</a>
          </h3>
          <h3>${price}</h3>
        </div>
        <span
          className={`${flexClass3} italic text-gray-500 dark:text-gray-400`}
        >
          {bulgarianName}
        </span>

        {/* only show itemDescription on screen on mobile */}
        <p className="hidden self-center py-4 italic text-gray-500 sm:block md:hidden">
          {itemDescription}
        </p>
      </div>
      {/* --------------add to cart button START-------------- */}
      <div
        className={`absolute bottom-4 flex ${buttonDivClass} justify-center`}
        // className={`absolute bottom-4 right-0 flex w-1/2 justify-center`}
      >
        {!isInCart(product) || currentCartItemQty(product) === 0 ? (
          <div className="mt-auto flex w-full items-center justify-center">
            <button
              onClick={() => {
                addToCart(product);
              }}
              className="border-lg mt-auto flex h-10 w-[70%] items-center justify-center gap-2 rounded-full border border-gray-200 bg-secondary-500 text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
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
          <div className="mt-auto flex items-center justify-center">
            <button
              className="rounded-lg rounded-r-none border border-gray-200 bg-secondary-500 px-2 py-1 text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white"
              onClick={() => {
                decreaseQty(product);
              }}
            >
              -
            </button>
            <span className="flex h-auto items-center bg-secondary-100 px-10 py-1">
              {isInCart(product) && currentCartItemQty(product)
                ? currentCartItemQty(product)
                : 0}
            </span>
            <button
              onClick={() => {
                increaseQty(product);
              }}
              className="rounded-lg rounded-l-none border border-gray-200 bg-secondary-500 px-2 py-1 text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white"
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
