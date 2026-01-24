import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCards/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"; 
import Button from "@mui/material/Button";

const HomeSectionCarousel = ({ data, SectionName }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 }, // 5.5 items shows a peek of the next card, encouraging scroll
  };

  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.slice(0, 10).map((item) => (
    <div key={item.id} className="mx-2"> 
      {/* Added margin x for spacing between cards */}
      <HomeSectionCard product={item} />
    </div>
  ));

  return (
    <div className="border-b border-gray-50 pb-10">
      <div className="relative px-4 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-2xl font-bold text-gray-900 py-5 text-left">
          {SectionName}
        </h2>

        <div className="relative p-5">
          <AliceCarousel
            ref={carouselRef}
            items={items}
            responsive={responsive}
            disableButtonsControls
            disableDotsControls
            onSlideChanged={syncActiveIndex}
            activeIndex={activeIndex}
            mouseTracking
            infinite={false}
            animationDuration={800} // Smoother animation
          />

          {/* PREVIOUS BUTTON */}
          {activeIndex !== 0 && (
            <Button
              onClick={slidePrev}
              variant="contained"
              sx={{
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translateY(-50%) translateX(-50%)", // Perfect centering
                zIndex: 50,
                bgcolor: "white",
                color: "black",
                minWidth: "3rem",
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "&:hover": {
                  bgcolor: "#f3f4f6", // gray-100
                  color: "#9155fd", // Brand color
                },
              }}
              aria-label="previous"
            >
              <KeyboardArrowLeftIcon />
            </Button>
          )}

          {/* NEXT BUTTON */}
          {activeIndex !== items.length - 5 && (
            <Button
              onClick={slideNext}
              variant="contained"
              sx={{
                position: "absolute",
                top: "50%",
                right: "0",
                transform: "translateY(-50%) translateX(50%)", // Perfect centering
                zIndex: 50,
                bgcolor: "white",
                color: "black",
                minWidth: "3rem",
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "&:hover": {
                  bgcolor: "#f3f4f6",
                  color: "#9155fd",
                },
              }}
              aria-label="next"
            >
              <KeyboardArrowRightIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSectionCarousel;