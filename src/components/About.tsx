import { Link } from "react-router-dom";
import {
  aboutChefImage,
  BioGeorgi,
  taglineGeorgi,
} from "../utilities/about-chef";

const About = () => {
  return (
    <>
      <section className="w-full bg-secondary-900 py-10 dark:bg-gray-900 lg:pt-14">
        <div className="mx-auto max-w-screen-sm py-10 px-8 sm:py-16 lg:max-w-screen-xl lg:px-6">
          <div className="max-w-screen-sm">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
              About Me
            </h2>
            <p className="mb-8 text-xl font-light italic text-secondary-200 dark:text-gray-400">
              "{taglineGeorgi}" - Georgi
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900" id="bio">
        <div className="mx-auto flex w-full flex-col gap-x-10 px-8 py-16 lg:grid lg:max-w-screen-xl lg:grid-flow-row lg:grid-cols-2">
          <div className="order-2 col-span-1 mt-10 h-auto min-h-[70vh] max-w-screen-xl grid-cols-6 text-xl text-gray-800 lg:order-1 lg:mt-2 lg:text-lg">
            <BioGeorgi />
            <br />
            <div className="mt-20 flex w-full flex-col items-center gap-4 lg:mt-0 lg:flex-row">
              <Link
                to="/about-bulgaria"
                className="inline-flex w-full min-w-[100px] items-center justify-center rounded-lg border border-primary-700 py-4 px-5 text-center text-xl font-medium text-gray-900 shadow-md hover:bg-primary-800 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-800 sm:w-3/4 lg:w-2/4 lg:text-base"
              >
                Learn About Bulgarian Cuisine
              </Link>
              <Link
                to="/shop"
                className="inline-flex w-full min-w-[100px] items-center justify-center rounded-lg border border-secondary-500 bg-secondary-600 py-4 px-5 text-center text-xl font-medium text-gray-900 shadow-md hover:bg-secondary-600 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-3/4 lg:w-2/4 lg:bg-transparent lg:text-base"
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
