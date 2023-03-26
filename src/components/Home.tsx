import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../contexts/cart/CartContext";
import "../index.css";
import ItemDetail from "./ItemDetail";
import ContactForm from "./ContactForm";
import { ProductContext } from "../contexts/product/ProductContextProvider";
import * as Scroll from "react-scroll";
import {
  slideshowImages,
  testimonials,
} from "../utilities/slideshowImages-Testimonials";

export function Home() {
  //   console.log("Home");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const { products, addProduct } = useContext(ProductContext);
  const { addToCart, increaseQty, decreaseQty, cartItems, removeFromCart } =
    useContext(CartContext);

  const Element = Scroll.Element;

  useEffect(() => {
    console.log("use effect ");
    const timerHeroImg = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slideshowImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000);

    const timerTestimonial = setInterval(() => {
      setCurrentTestimonialIndex((prevSlide) =>
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 7000);

    return () => {
      clearInterval(timerHeroImg);
      clearInterval(timerTestimonial);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentTestimonialIndex((index) =>
      index === 0 ? testimonials.length - 1 : index - 1
    );
  };

  const handleNextClick = () => {
    setCurrentTestimonialIndex((index) =>
      index === testimonials.length - 1 ? 0 : index + 1
    );
  };

  return (
    <>
      {/* ------------------- HERO SECTION  ----------------*/}
      <section className="hero bg-primary-400 pt-16 dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-10 lg:grid-cols-12 lg:gap-12 lg:py-16 xl:gap-4">
          <div className="mr-auto place-self-center lg:col-span-5">
            <h1 className="text-shadow-header mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-primary-100 dark:text-white md:text-5xl xl:text-6xl">
              MasterChef Georgi
            </h1>
            <p className="mb-6 max-w-2xl font-light text-white dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Explore the rich flavors of Bulgarian cuisine and bring a taste of
              Bulgaria to your home!
            </p>
            <div className="flex w-full gap-5">
              <Link to="/shop">
                <button className="button-shake inline-flex min-w-[120px] items-center justify-center rounded-lg bg-secondary-600 py-3 text-center text-base font-bold text-white hover:bg-secondary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 sm:h-auto sm:w-1/4">
                  Shop
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
              </Link>
              <Link
                to="/about-bulgaria"
                className="btn-whats-bulgarian-cuisine inline-flex min-w-[150px] items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-primary-800 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700  dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 sm:w-3/4 lg:w-2/4"
              >
                What Is Bulgarian Cuisine?
              </Link>
            </div>
          </div>
          {/* --------------- slideshow on hero gallery on food START------------*/}
          <div className="hidden lg:col-span-6 lg:col-end-13 lg:mt-0 lg:flex">
            <div className="relative h-96 w-full">
              {slideshowImages.map((imageUrl, index) => (
                <img
                  key={imageUrl}
                  src={imageUrl}
                  alt={`slide-${index}`}
                  className={`absolute top-0 left-0 h-full w-full rounded-lg transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute bottom-0 left-0 mb-4 flex w-full justify-center space-x-2">
                {slideshowImages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 w-3 cursor-pointer rounded-full bg-white transition duration-1000 ease-in-out ${
                      index === currentSlide ? "bg-gray-900" : ""
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* --------------- slideshow on hero gallery on food END------------*/}
        </div>
      </section>
      {/* ------------------- POPULAR MENU SECTION  ----------------*/}
      <section className="bg-secondary-50 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6 ">
          <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Most Popular
            </h2>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
              Tastiest Bulgarian Delights That We Love
            </p>
          </div>
          <div className="mb-4 grid gap-5 lg:mb-10">
            {/* ---------------Popular Individual Item START------------*/}
            {/* <div className="max-w-screen container mx-auto h-auto min-h-[70vh] p-4 lg:p-6"> */}
            <div className="grid w-full gap-16 pt-12 pb-12 sm:grid-cols-1 lg:grid-cols-2 lg:pb-12">
              {/* //shows first four products only */}
              {products.slice(0, 4).map((product) => {
                return (
                  <div key={product.id}>
                    <ItemDetail
                      product={product}
                      cardClass="grid grid-cols-2"
                      aTagClass=""
                      flexClass1=""
                      flexClass2=""
                      flexClass3=""
                      itemDescription=""
                      buttonDivClass="right-0 w-1/2"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------Popular Individual Item End------------*/}
        </div>
        {/* </div> */}
      </section>
      {/* ------------------- TESTIMONIAL SECTION  ----------------*/}
      <section className="bg-white dark:bg-gray-900">
        <div className="relative mx-auto h-96 max-w-screen-xl px-4 py-8 text-center lg:py-16 lg:px-6">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={handlePrevClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-secondary-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={handleNextClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6  text-secondary-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <figure className="mx-auto max-w-screen-md">
            <svg
              className="mx-auto mb-3 h-12 text-secondary-200 dark:text-gray-600"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl font-medium text-gray-600 dark:text-white">
                {testimonials[currentTestimonialIndex].quote}
              </p>
            </blockquote>
            <figcaption className=" mt-6 flex items-center justify-center space-x-3">
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  {testimonials[currentTestimonialIndex].author}
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  {testimonials[currentTestimonialIndex].location}
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      {/* ------------------- CONTACT SECTION  ----------------*/}
      <Element name="contact">
        <ContactForm />
      </Element>
    </>
  );
}
