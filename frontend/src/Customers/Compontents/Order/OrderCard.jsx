import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/account/order/${5}`)}className="p-6 shadow-md rounded-xl shadow-gray-400 hover:shadow-2xl border border-gray-200 transition-shadow duration-300">
      <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
        {/* IMAGE & INFO: 6 cols on Desktop, Full width on Mobile */}
        <Grid item xs={12} sm={6}>
          <div className="flex cursor-pointer items-center">
            <img
              className="w-20 h-20 object-cover rounded-md"
              src="https://m.media-amazon.com/images/I/41-JRsq45nL._SX342_SY445_QL70_FMwebp_.jpg"
              alt=""
            />
            <div className="ml-5 space-y-1">
              <p className="font-medium">Men Slim Mid Rise Black Jeans</p>
              <p className="opacity-50 text-xs font-semibold">Size: M, L</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid>

        {/* PRICE: 2 cols on Desktop, part of row on Mobile */}
        <Grid item xs={6} sm={2}>
          <p className="font-bold text-gray-800">$1099</p>
        </Grid>

        {/* STATUS: 4 cols on Desktop */}
        <Grid item xs={6} sm={4}>
          {true && (
            <div>
              <p className="flex items-center">
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span className="font-medium text-sm">
                  Delivered On March 03
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Your Item Has Been Delivered
              </p>
            </div>
          )}
          {false && (
            <p className="text-sm">
              <span>Expected Delivery On March 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
