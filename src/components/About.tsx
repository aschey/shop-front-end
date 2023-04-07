import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/product/ProductContextProvider";
import {
  aboutChefImage,
  BioGeorgi,
  taglineGeorgi,
} from "../utilities/about-chef";

const About = () => {
  return (
    <>
      <section className="w-full bg-secondary-900 pt-48 pb-28 dark:bg-gray-900 lg:pt-14">
        <div className="mx-auto max-w-screen-md py-16 lg:max-w-screen-xl lg:px-16">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-200 dark:text-white lg:text-4xl">
              About Me
            </h2>
            <p className="mb-8 text-4xl font-light italic text-secondary-200 dark:text-gray-400 lg:text-xl">
              "{taglineGeorgi}" - Georgi
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900" id="bio">
        <div className="mx-auto flex w-full max-w-screen-md flex-col gap-x-10 sm:py-16 lg:grid lg:max-w-screen-xl lg:grid-flow-row lg:grid-cols-2 lg:px-16">
          <div className="order-2 col-span-1 mt-10 h-auto min-h-[70vh] max-w-screen-xl grid-cols-6 text-4xl text-gray-800 lg:order-1 lg:mt-2 lg:text-lg">
            <BioGeorgi />
            <br />
            <div className="mt-20 flex flex-col items-center lg:mt-0">
              <Link
                to="/about-bulgaria"
                className="my-4 inline-flex min-w-[100px] items-center justify-center rounded-lg border border-primary-700 py-6 px-5 text-center text-4xl font-medium text-gray-900 hover:bg-primary-800 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-800 sm:w-3/4 lg:w-2/4 lg:py-4 lg:text-base"
              >
                Learn About Bulgarian Cuisine
              </Link>
              <Link
                to="/shop"
                className="my-4 inline-flex min-w-[100px] items-center justify-center rounded-lg border border-secondary-500 bg-secondary-600 py-6 px-5 text-center text-4xl font-medium text-gray-900 hover:bg-secondary-600 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-3/4 lg:w-2/4 lg:bg-transparent lg:py-4 lg:text-base"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <img
            className="order-1 col-span-1 my-8 grid-cols-4 lg:order-2 lg:m-auto lg:max-h-[70vh] "
            src={aboutChefImage[0]}
            alt="Masterchef Georgi"
          />
        </div>
      </section>
    </>
  );
};

export default About;
