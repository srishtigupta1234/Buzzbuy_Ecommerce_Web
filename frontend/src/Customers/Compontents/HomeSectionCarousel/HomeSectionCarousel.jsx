import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCards/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";

const HomeSectionCarousel = ({data,SectionName}) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const slidePrev = () => carouselRef.current?.slidePrev();
  const slideNext = () => carouselRef.current?.slideNext();

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items =data.slice(0, 10).map((item) => (
    <HomeSectionCard key={item.id} product={item} />
  ));

  return (
    <div className="">
      <h2 className="text-2xl font-extrabold text-gray-800 py-5">{SectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          activeIndex={activeIndex}
          onSlideChanged={syncActiveIndex}
        />

        {/* NEXT BUTTON */}
        {activeIndex < items.length - 1 && (
          <Button
            onClick={slideNext}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%)",
              bgcolor: "white",
              minWidth: "40px",
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(180deg)", color: "black" }}
            />
          </Button>
        )}

        {/* PREVIOUS BUTTON */}
        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%)",
              bgcolor: "white",
              minWidth: "40px",
            }}
          >
            <KeyboardArrowLeftIcon sx={{ color: "black" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
