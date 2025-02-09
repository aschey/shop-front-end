import CartContext from "../contexts/cart/CartContext";
import { useContext, ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItems, clearCart, totalPrice, decreaseQty, increaseQty } =
    useContext(CartContext);

  const handleCheckOutProcess = async () => {
    const checkoutItems = cartItems.map(
      ({ stripePriceId: price, qty: quantity }) => ({
        price,
        quantity,
      })
    );

    //initiate stripe checkout and also clear cart (clear cart only when checkout is successful?)
    (async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DB_URL}/api/create-checkout-session`,
        {
          cart: checkoutItems,
        }
      );

      if (response.status === 200) {
        const redirectCheckoutUrl = response.data;
        window.location.href = redirectCheckoutUrl;
        // navigate(`/${redirectCheckoutUrl}`);
        return;
      } else {
        throw Error("Error With Checkout");
      }
    })();
  };

  return (
    <>
      <section className="w-full bg-secondary-900 py-10 pt-28 dark:bg-gray-900">
        <div className="mx-auto px-4 py-10 sm:py-16 lg:max-w-screen-xl lg:px-6">
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white lg:text-4xl">
            {cartItems.length === 0 ? (
              <p>Your Cart Is Empty 🛒</p>
            ) : (
              <p>Your Cart</p>
            )}
          </h2>
        </div>
      </section>
      <section className="w-full bg-secondary-50 py-10 text-gray-700 dark:bg-gray-800">
        <div className="container mx-auto flex h-auto min-h-[70vh] max-w-screen-md flex-col items-center gap-10 p-4 lg:max-w-screen-xl lg:p-6">
          {cartItems.length === 0 && (
            <Link
              to="/shop"
              className="rounded-sm px-3 text-lg font-medium hover:text-secondary-700"
            >
              Click Here to Continue Shopping
            </Link>
          )}
          {cartItems.length > 0 && (
            <>
              <table className="border-lg mx-auto w-full table-fixed rounded-lg bg-white text-lg shadow-md">
                <thead>
                  <tr>
                    <th className="w-fit border-b-2 border-primary-800 py-4 font-bold">
                      Product Name
                    </th>
                    <th className="w-fit border-b-2 border-primary-800 font-bold">
                      Price
                    </th>
                    <th className="w-fit border-b-2 border-primary-800">
                      Quantity
                    </th>
                    <th className="w-fit border-b-2 border-primary-800">
                      Pre-tax Subtotal*
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cartItems.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className="h-20 lg:h-14">{item.itemName}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="mt-auto flex items-center justify-center">
                            <button
                              className="rounded-lg rounded-r-none border border-gray-200 bg-secondary-500 px-2 py-1 text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white"
                              onClick={() => {
                                if (item.qty >= 1) {
                                  decreaseQty(item);
                                }
                              }}
                            >
                              -
                            </button>
                            <span className="h-auto w-24 bg-secondary-100 px-2 py-1 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => {
                                //why its being increased twice?
                                increaseQty(item);
                              }}
                              className="rounded-lg rounded-l-none border border-gray-200 bg-secondary-500 px-2 py-1 text-gray-200 hover:border-white hover:bg-secondary-400 hover:text-white dark:hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${(item.qty * item.price).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="border-t-2 border-primary-800 text-right font-bold">
                      Total:
                    </td>
                    <td className="border-t-2 border-primary-800 py-4">
                      ${totalPrice ? totalPrice : ""}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="px-2 text-end text-sm italic text-gray-500"
                    >
                      *Taxes will be calculated at checkout
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full md:w-auto">
                <button
                  className="button-shake flex w-full items-center justify-center rounded-lg bg-secondary-600 py-3 text-center text-xl font-bold text-white shadow-md hover:bg-secondary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 lg:w-[20vw] lg:text-base"
                  onClick={handleCheckOutProcess}
                >
                  Check Out
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
