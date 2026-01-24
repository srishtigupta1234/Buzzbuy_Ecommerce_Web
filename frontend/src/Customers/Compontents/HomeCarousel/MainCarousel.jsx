import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCarouselData";
import { useNavigate } from "react-router-dom";

const MainCarousel = () => {
  const navigate = useNavigate();

  const items = homeCarouselData.map((item) => (
    <div className="relative w-full h-[60vh] lg:h-[65vh] group overflow-hidden">
      
      
      <img
        className="w-full h-full object-cover object-top"
        role="presentation"
        src={item.image}
        alt="Fashion Banner"
      />

      
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 via-gray-900/30 to-transparent flex flex-col justify-center items-start px-8 lg:px-10">
   
        <div className="max-w-xl space-y-6">
            
        
            <p className="text-gray-300 text-sm lg:text-base font-medium tracking-[0.2em] uppercase pl-1 border-l-2 border-yellow-500">
                New Arrivals
            </p>

          
            <h2 className="text-2xl lg:text-3xl font-bold text-white font-serif leading-tight">
                Refine Your <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-500">
                    Signature Style
                </span>
            </h2>

          
            <p className="text-lg text-gray-200 font-serif leading-relaxed max-w-lg">
                Discover the latest trends in fashion and  <br/> elevate your wardrobe with our exclusive <br/>seasonal collection.
            </p>

          
            <div className="pt-4">
                <button
                onClick={() => navigate('/products')}
                className="group relative px-8 py-3 bg-white text-gray-900 font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:bg-gray-900 hover:text-white border-2 border-white"
                >
                    <span className="relative z-10">Shop Collection</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="w-full relative z-0">
        <AliceCarousel
        items={items}
        disableButtonsControls
        disableDotsControls={false} 
        autoPlay
        autoPlayInterval={4000}
        infinite
        animationType="fadeout"
        animationDuration={1500}
        mouseTracking
        />
    </div>
  );
};

export default MainCarousel;