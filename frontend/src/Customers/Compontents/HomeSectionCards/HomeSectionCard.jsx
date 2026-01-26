import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden w-60  border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      {/* 1. w-[15rem]: Narrower width makes it look like a proper product card.
         2. h-[13rem]: Fixed height for the image container ensures alignment.
      */}
      <div className="h-60 w-full">
        <img
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt={product.title || "Product Image"}
        />
        {/* object-top ensures the model's face is never cut off */}
      </div>

      <div className="p-4 w-full">
        <h3 className="text-lg font-medium text-gray-900 brand-font">
          {product.brand}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-1">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;