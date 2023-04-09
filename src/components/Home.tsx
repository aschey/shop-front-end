import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import ItemDetail from "./ItemDetail";
import ContactForm from "./ContactForm";
import { ProductContext } from "../contexts/product/ProductContextProvider";
import * as Scroll from "react-scroll";
import {
  slideshowImages,
  testimonials,
} from "../utilities/slideshowImages-Testimonials";
import { Spinner } from "flowbite-react";

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const { products, addProduct } = useContext(ProductContext);

  const Element = Scroll.Element;

  useEffect(() => {
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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handlePrevClick();
    } else if (isRightSwipe) {
      handleNextClick();
    }
  };

  return (
    <>
      {/* ------------------- HERO SECTION  ----------------*/}
      <section className="hero bg-primary-400 py-20 pt-24 dark:bg-gray-900 lg:pt-16 lg:pb-2">
        <div className="mx-auto grid px-8 py-10 lg:max-w-screen-xl lg:grid-cols-12 lg:gap-12 lg:py-16 xl:gap-4">
          <div className="mr-auto w-full place-self-center px-4 lg:col-span-5 lg:px-0 lg:text-start">
            <h1 className="text-shadow-header mb-4 w-full text-5xl font-extrabold leading-none tracking-tight text-primary-100 dark:text-white lg:max-w-2xl lg:text-4xl xl:text-6xl">
              MasterChef Georgi
            </h1>
            <p className="mb-6 mt-4 text-xl font-light text-white dark:text-gray-400 lg:mt-1 lg:mb-8 lg:max-w-2xl lg:text-xl">
              Explore the rich flavors of Bulgarian cuisine and bring a taste of
              Bulgaria to your home!
            </p>
            <div className="mt-20 flex w-full flex-col gap-6 lg:mt-1 lg:flex-row lg:gap-5">
              <Link to="/shop">
                <button className="button-shake inline-flex w-full items-center justify-center rounded-lg bg-secondary-600 py-3 text-center text-xl font-bold text-white shadow-md hover:bg-secondary-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 md:min-w-[120px] lg:h-auto lg:text-lg">
                  <p className="ml-4">Shop</p>
                  <svg
                    className="ml-4 h-8 lg:mr-0 lg:h-5 lg:w-14"
                    fill="currentColor"
                    viewBox="0 0 18 20"
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
                className="btn-whats-bulgarian-cuisine inline-flex min-w-[150px] items-center justify-center rounded-lg border border-gray-300 px-5 py-3.5 text-center text-xl font-medium text-gray-900 shadow-md hover:bg-primary-800 hover:text-white focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-800 lg:w-3/4 lg:py-3 lg:text-base"
              >
                What is Bulgarian Cuisine?
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
        <div className="mx-auto max-w-screen-xl px-8 py-16 lg:px-6">
          <div className="mx-auto my-8 mb-8 max-w-screen-sm text-center lg:mt-2 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              Most Popular
            </h2>
            <p className="text-2xl font-light text-gray-500 dark:text-gray-400 lg:mb-16 lg:text-lg">
              Tastiest Bulgarian Delights That We Love
            </p>
          </div>
          <div className="mx-auto grid gap-5 lg:mb-10 lg:max-w-screen-xl ">
            {/* ---------------Popular Individual Item START------------*/}
            {products.length === 0 ? (
              // <div className="flex flex-col gap-2">
              <div className="text-center">
                <Spinner
                  color="info"
                  size="xl"
                  aria-label="Product Spinner Loading"
                  className="h-20 w-20"
                />
              </div>
            ) : (
              <div className="grid w-full grid-cols-1 gap-16 pt-12 pb-12 lg:grid-cols-2 lg:pb-12">
                {/* //shows first four products only */}
                {products.slice(0, 4).map((product) => {
                  return (
                    <div key={product.id}>
                      <ItemDetail
                        product={product}
                        cardClass="lg:grid-cols-2 grid grid-cols-1"
                        aTagClass={""}
                        flexClass1={""}
                        flexClass2={""}
                        flexClass3={""}
                        buttonDivClass={"left-1/2 lg:w-1/2"}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------Popular Individual Item End------------*/}
        </div>
        {/* </div> */}
      </section>
      {/* ------------------- TESTIMONIAL SECTION  ----------------*/}
      <section
        className="bg-white dark:bg-gray-900"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative mx-auto mt-20 h-96 max-w-screen-xl px-4 py-8 text-center lg:mt-0 lg:py-16 lg:px-6">
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
              className="h-10 w-10 text-secondary-900 lg:h-6 lg:w-6"
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
              className="h-10 w-10 text-secondary-900 lg:h-6 lg:w-6"
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
              <p className="mx-14 text-xl font-medium text-gray-600 dark:text-white lg:px-0 lg:text-2xl">
                {testimonials[currentTestimonialIndex].quote}
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center space-x-3">
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 text-lg font-medium text-gray-900 dark:text-white lg:text-lg">
                  {testimonials[currentTestimonialIndex].author}
                </div>
                <div className="lg:text-md text-md pl-3 font-light text-gray-500 dark:text-gray-400">
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
