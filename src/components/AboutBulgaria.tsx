import { aboutBulgariaImages } from "../utilities/about-bulgaria";
import { WhatIsBulgarianCuisine } from "../utilities/about-chef";
const AboutBulgaria = () => {
  return (
    <>
      <section className="w-full bg-secondary-900 pt-48 pb-28 dark:bg-gray-900 lg:pt-14">
        <div className="mx-auto max-w-screen-xl sm:py-16 lg:px-16">
          <div className="max-w-screen-md">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-200 dark:text-white">
              So... What is Bulgarian Cuisine?
            </h2>
            <p className="mb-8 font-light italic text-secondary-200 dark:text-gray-400 sm:text-xl">
              It is all about the rich flavors and hearty taste
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-secondary-50 dark:bg-gray-900" id="bio">
        <div className="mx-auto grid w-full max-w-screen-xl grid-flow-row grid-cols-2 gap-x-10 sm:py-16 lg:px-16">
          <div className="col-span-1 h-auto min-h-[70vh] max-w-screen-xl grid-cols-6 text-lg text-gray-800">
            <WhatIsBulgarianCuisine />
          </div>
          <div className="col-span-1 mx-auto grid-cols-4 lg:max-h-[70vh]">
            {aboutBulgariaImages.slice(1).map((imageUrl) => {
              return (
                <img
                  src={imageUrl}
                  className="about-bulgaria-img mx-14 my-12 lg:max-h-[40vh]"
                  alt="Bulgarian Food Scene"
                />
              );
            })}
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-screen-xl py-10">
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
