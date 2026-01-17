import React from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ProductReviewCard = () => {
  return (
    // Changed: Lighter border, removed shadow for a flatter "clean" look
    <Box className="bg-white border-b border-gray-100 py-6 last:border-b-0">
      <Grid container spacing={3}>
        {/* Avatar Section */}
        <Grid item>
          <Avatar
            sx={{
              width: 42, // Slightly smaller for elegance
              height: 42,
              bgcolor: "#f3f4f6", // Muted background
              color: "#9155fd",   // Brand color for initials
              fontWeight: 600,
              fontSize: "0.9rem",
              border: "1px solid #e5e7eb"
            }}
          >
            R
          </Avatar>
        </Grid>

        {/* Review Content */}
        <Grid item xs>
          <div className="flex flex-col gap-1">
            {/* Name & Date */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Raam</p>
                {/* Added: Verified Purchase Badge */}
                <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">
                  Verified Purchase
                </p>
              </div>
              <p className="text-xs text-gray-400">April 5, 2023</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Rating 
                value={4.5} 
                precision={0.5} 
                readOnly 
                size="small" 
                sx={{ color: "#9155fd", fontSize: "1rem" }} // Consistent brand color
              />
            </div>

            {/* Review Text */}
            <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-2xl">
              Nice product! The fabric quality is very good and the fitting is
              perfect. Totally worth the price.
            </p>

            {/* Added: Helpful Tag - common in Amazon/Flipkart */}
            <div className="mt-3">
              <button className="text-xs text-gray-400 hover:text-[#9155fd] border border-gray-200 px-3 py-1 rounded-full transition-colors">
                Helpful
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductReviewCard;