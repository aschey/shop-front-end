import CartContext from "../contexts/cart/CartContext";
import { useContext, ChangeEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  console.log("Cart Page-  cartItem:");

  const { cartItems, clearCart, totalPrice, decreaseQty, increaseQty } =
    useContext(CartContext);
  console.log(cartItems);
  console.log("totalPrice: " + totalPrice);
  const navigate = useNavigate();

  //TODO
  const handleCheckOutProcess = async () => {
    console.log("handleCheckoutPorcess");
    console.log("checkout items:");
    console.log(cartItems);

    const checkoutItems = cartItems.map(
      ({ stripePriceId: price, qty: quantity }) => ({
        price,
        quantity,
      })
    );

    //initiate stripe checkout and also clear cart (clear cart only when checkout is successful?)
    (async () => {
      // const createStripeCheckoutSession = async () => {
      // (async () => {
      console.log("createStripeCheckoutSession");
      console.log(
        `${import.meta.env.VITE_BACKEND_DB_URL}/api/create-checkout-session`
      );
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DB_URL}/api/create-checkout-session`,
        {
          cart: checkoutItems,
        }
      );

      console.log("awaited response");
      console.log(response);

      if (response.status === 200) {
        console.log("200 response");
        console.log(response.data);
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
      <section className="w-full bg-secondary-900 pt-16 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-md py-8 px-4 sm:py-16 lg:px-6">
          <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
            {cartItems.length === 0 ? (
              <p>Your Cart Is Empty 🛒</p>
            ) : (
              "Your Cart"
            )}
          </h2>
        </div>
      </section>
      <section className="w-full bg-secondary-50 text-gray-700 dark:bg-gray-800">
        <div className="container mx-auto flex h-auto min-h-[70vh] max-w-screen-xl flex-col items-center p-4 lg:p-6">
          {cartItems.length === 0 && (
            <Link
              to="/shop"
              className="rounded-md px-3 py-2 text-lg font-medium"
            >
              Click Here to Continue Shopping
            </Link>
          )}
          {cartItems.length > 0 && (
            <>
              <table className="border-lg m-16 mx-auto w-11/12 table-fixed rounded-lg bg-white">
                <thead>
                  <tr>
                    <th className="border-b-2 border-primary-800 py-4 font-bold">
                      Product Name
                    </th>
                    <th className="border-b-2 border-primary-800 font-bold">
                      Price
                    </th>
                    <th className="border-b-2 border-primary-800">Quantity</th>
                    <th className="w-fit border-b-2 border-primary-800">
                      Pre-tax Subtotal*
                    </th>
                  </tr>
                </thead>
                <tbody className=" text-center">
                  {cartItems.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className="py-4">{item.itemName}</td>
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
                    <td colSpan={4} className="text-end italic text-gray-500">
                      *Taxes will be calculated at checkout
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                className=" button-shake flex min-w-[30vw] items-center justify-center rounded-lg bg-secondary-600 py-3 text-center text-base font-bold text-white hover:bg-secondary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 sm:w-[80vw] md:w-[30vw]"
                onClick={handleCheckOutProcess}
              >
                Check Out
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
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
              {/* </Link> */}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
