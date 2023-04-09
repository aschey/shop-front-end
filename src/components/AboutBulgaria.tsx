import { aboutBulgariaImages } from "../utilities/about-bulgaria";
import { WhatIsBulgarianCuisine } from "../utilities/about-chef";
const AboutBulgaria = () => {
  return (
    <>
      <section className="w-full bg-secondary-900 py-10 dark:bg-gray-900 lg:pt-14">
        <div className="mx-auto max-w-screen-sm py-10 px-8 sm:py-16 lg:max-w-screen-xl lg:px-6">
          <div className="max-w-screen-sm">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
              So... What is Bulgarian Cuisine?
            </h2>
            <p className="mb-8 text-xl font-light text-secondary-200 dark:text-gray-400">
              It is all about the rich flavors and hearty taste
            </p>
          </div>
        </div>
      </section>
      <section
        className="w-full bg-secondary-50 px-8 dark:bg-gray-900"
        id="bio"
      >
        <div className="container mx-auto grid h-auto min-h-[70vh] grid-cols-1 gap-20 p-4 lg:mb-10 lg:max-w-screen-xl lg:grid-cols-5 lg:p-6">
          <div className="col-span-1 my-20 h-auto max-w-screen-xl text-lg text-gray-800 lg:col-span-3 lg:mt-0 lg:min-h-[70vh] lg:text-lg">
            <WhatIsBulgarianCuisine />
          </div>
          <div className="col-span-1 h-auto w-full lg:col-span-2">
            {aboutBulgariaImages.slice(1).map((imageUrl) => {
              return (
                <img
                  src={imageUrl}
                  className="about-bulgaria-img mb-12 w-full py-4 lg:max-h-[35vh]"
                  alt="Bulgarian Food Scene"
                />
              );
            })}
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-screen-md pb-20 lg:max-w-screen-xl">
          <img
            className="about-bulgaria-img col-span-1 m-auto w-full grid-cols-4 items-stretch"
            src={aboutBulgariaImages[0]}
            alt="Nessebar Seaside Dining"
          />
        </div>
      </section>
    </>
  );
};

export default AboutBulgaria;
