import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { deepPurple } from "@mui/material/colors";
const OrderDetail = () => {
  return (
    <div className="px-5 lg:px-20">
      <div className="pl-20 pt-10">
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>
      <Grid container className="space-x-5 space-y-5 justify-center">
       {[1,1,1,1,1,1,1].map((item)=> <Grid
          item
          container
          className="shadow-xl rounded-md p-5 border border-gray-400"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item xs={6} className="flex gap-5">
            <div>
              <img
                className="w-20 h-20 object-cover object-top"
                src="https://m.media-amazon.com/images/I/71TSvifFuqL._SL1500_.jpg"
                alt=""
              />
            </div>
            <div className="space-y-2 ml-5">
              <p className="font-semibold">Mid Slim Mid Rise Black Jeans</p>
                <p className="space-x-5 opacity-50 text-xs font-semibold">
                  <span>Color: Pink</span>
                  <span>Size: M</span>
                </p>
              <p>Seller: Lyra</p>
              <p>$1099</p>
            </div>
          </Grid>
          <Grid item>
            <Box sx={{color:deepPurple[500]}} >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2" />
              <span>Rate & Review Product</span>
            </Box>
          </Grid>
        </Grid>)}
      </Grid>
    </div>
  );
};

export default OrderDetail;
