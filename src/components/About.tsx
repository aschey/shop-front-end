import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../contexts/product/ProductContextProvider";

const About = () => {
  const { products, addProduct } = useContext(ProductContext);

  return (
    <>
      <section className="w-full bg-secondary-900 pt-14 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 sm:py-16 lg:px-6">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
              About Me
            </h2>
            <p className="mb-8 font-light text-secondary-200 dark:text-gray-400 sm:text-xl">
              Georgi is...!
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900">
        <div className="container mx-auto h-auto min-h-[70vh] max-w-screen-xl p-4 lg:p-6">
          <p>Georgi's bio</p>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900">
        <div className="container mx-auto h-auto min-h-[70vh] max-w-screen-xl p-4 lg:p-6">
          <h1>What is Bulgarian Cuisine?</h1>
        </div>
      </section>
    </>
  );
};

export default About;
