import { aboutBulgariaImages } from "../utilities/about-bulgaria";
import { WhatIsBulgarianCuisine } from "../utilities/about-chef";
const AboutBulgaria = () => {
  return (
    <>
      <section className="w-full bg-secondary-900 pt-48 pb-28 dark:bg-gray-900 lg:pt-14">
        <div className="mx-auto max-w-screen-md py-10 px-4 sm:py-16 lg:max-w-screen-xl lg:px-6">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-200 dark:text-white lg:text-4xl">
              So... What is Bulgarian Cuisine?
            </h2>
            <p className="mb-8 text-3xl font-light text-secondary-200 dark:text-gray-400 lg:text-xl">
              It is all about the rich flavors and hearty taste
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900" id="bio">
        <div className="container mx-auto grid h-auto min-h-[70vh] max-w-screen-md gap-5 p-4 lg:mb-10 lg:max-w-screen-xl lg:grid-cols-2 lg:p-6">
          <div className="col-span-1 my-20 h-auto max-w-screen-xl text-2xl text-gray-800 lg:mt-0 lg:min-h-[70vh] lg:grid-cols-6 lg:text-lg">
            <WhatIsBulgarianCuisine />
          </div>
          <div className="col-span-1 mx-auto h-auto lg:grid-cols-4">
            {aboutBulgariaImages.slice(1).map((imageUrl) => {
              return (
                <img
                  src={imageUrl}
                  className="about-bulgaria-img mb-12 w-[80vw] lg:max-h-[35vh]"
                  alt="Bulgarian Food Scene"
                />
              );
            })}
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-screen-md pb-20 lg:max-w-screen-xl">
          <img
            className="about-bulgaria-img w-100 col-span-1 m-auto grid-cols-4 items-stretch"
            src={aboutBulgariaImages[0]}
            alt="Nessebar Seaside Dining"
          />
        </div>
      </section>
    </>
  );
};

export default AboutBulgaria;
