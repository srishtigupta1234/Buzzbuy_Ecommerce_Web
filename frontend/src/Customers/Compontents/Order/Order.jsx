import { Grid } from "@mui/material";
import React from "react";
import OrderCard from "./OrderCard";

const OrderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  return (
    <div className="p-5 lg:p-15 bg-gray-50 min-h-screen">
      <Grid container spacing={4} alignItems="flex-start" justifyContent={"space-evenly"}>

        {/* FILTER SIDEBAR */}
        <Grid item xs={12} md={3}>
          <div className="shadow-lg bg-white p-5 sticky top-5 rounded-lg">
            <h1 className="font-bold text-lg">Filter</h1>

            <div className="space-y-4 mt-8">
              <h1 className="font-semibold text-sm">ORDER STATUS</h1>

              {OrderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    type="checkbox"
                    value={option.value}
                    className="h-4 w-4 border-gray-300 text-indigo-600"
                  />
                  <label className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* ORDER LIST */}
        <Grid item xs={12} md={9}>
          <div className="flex justify-center -ml-70">
            <div className="w-full max-w-4xl space-y-6">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <OrderCard key={index} />
              ))}
            </div>
          </div>
        </Grid>

      </Grid>
    </div>
  );
};

export default Order;
