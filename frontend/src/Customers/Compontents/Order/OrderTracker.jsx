import { Stepper,Step,StepLabel } from "@mui/material";
import React from "react";

const  steps=[
    "Placed","Order Confirmed","Shipped","Out For Delivery","Delivered"
]
const OrderTracker = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{color:"#9155FD", fontSize:"44px"}}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
