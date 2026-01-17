import React from "react";
import MainCarousel from "../../HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../HomeSectionCarousel/HomeSectionCarousel";
import { kurta } from "../../../../Data/mens_kurta";
import { shirt } from "../../../../Data/mens_shirt";
import { tops } from "../../../../Data/women_tops";
import { dress } from "../../../../Data/women_dress";

const HomePage = () => {
  return (
    <>
      <div>
        <MainCarousel />
        <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
          <HomeSectionCarousel data={kurta} SectionName={"Men's Kurta"}/>
          <HomeSectionCarousel data={dress} SectionName={"Women's Dress"}/>
          <HomeSectionCarousel data={shirt} SectionName={"Men's Shirts"}/>
          <HomeSectionCarousel data={tops} SectionName={"Women's Tops"} />
          <HomeSectionCarousel data={dress} SectionName={"Women's Dress"}  />
        </div>
      </div>
    </>
  );
};

export default HomePage;
