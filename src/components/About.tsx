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
      <section className="w-full bg-secondary-900 pt-14 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl sm:py-16 lg:px-16">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
              About Me
            </h2>
            <p className="mb-8 font-light italic text-secondary-200 dark:text-gray-400 sm:text-xl">
              "{taglineGeorgi}" - Georgi
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900" id="bio">
        <div className="mx-auto grid w-full max-w-screen-xl grid-flow-row grid-cols-2 gap-x-10 sm:py-16 lg:px-16">
          <div className="col-span-1 h-auto min-h-[70vh] max-w-screen-xl grid-cols-6 text-lg text-gray-800">
            <BioGeorgi />
            <br />
            <div className="flex flex-col">
              <Link
                to="/about-bulgaria"
                className="my-2 inline-flex min-w-[100px] items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-primary-800 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700  dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-3/4 lg:w-2/4"
              >
                Learn About Bulgarian Cuisine
              </Link>
              <Link
                to="/shop"
                className="my-2 inline-flex min-w-[100px] items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-secondary-600 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700  dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-3/4 lg:w-2/4"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <img
            className="col-span-1 m-auto grid-cols-4 lg:max-h-[70vh]"
            src={aboutChefImage[0]}
            alt="Masterchef Georgi"
          />
        </div>
      </section>
    </>
  );
};

export default About;
