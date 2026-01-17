import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch } from "react-redux";
import { createOrder }  from "../../../State/Order/Action"
import { useNavigate } from "react-router-dom";
const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address ={
      firstName:data.get("firstName"),
      lastName:data.get("lastName"),
      streetAddress:data.get("address"),
      city:data.get("city"),
      state:data.get("state"),
      zipCode:data.get("zip"),
      mobile:data.get("phoneNumber")
    }
    const orderData={address,navigate}
    dispatch(createOrder(orderData))
  }
  return (
    <Box sx={{ width: "100%" }}>
      {/* Outer Grid (Left vs Right Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SECTION: Saved Addresses (Takes 5 columns on Large screens) */}
        <div className="lg:col-span-5 bg-white border rounded-lg shadow-sm max-h-122 overflow-y-auto">
          <div className="p-6 border-b">
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Saved Address
            </Typography>
            
            <AddressCard />
            
            <Button
              sx={{ mt: 3, bgcolor: "RGB(145 85 253)" }}
              size="large"
              variant="contained"
              fullWidth
            >
              Deliver Here
            </Button>
          </div>
        </div>

        {/* RIGHT SECTION: New Address Form (Takes 7 columns on Large screens) */}
        <div className="lg:col-span-7">
          <Box className="bg-white border rounded-lg shadow-sm p-8">
            <Typography variant="h6" fontWeight="bold" mb={4}>
              Add New Address
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* FORM GRID: Using Tailwind Grid for absolute control */}
              <div className="grid grid-cols-12 gap-4">
                
                {/* First Name (Half Width) */}
                <div className="col-span-12 sm:col-span-6">
                  <TextField label="First Name" name='firstName' fullWidth required />
                </div>
                
                {/* Last Name (Half Width) */}
                <div className="col-span-12 sm:col-span-6">
                  <TextField label="Last Name" name='lastName' fullWidth required />
                </div>

                {/* Address (Full Width & Taller) */}
                <div className="col-span-12">
                  <TextField
                    name='address'
                    label="Address"
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </div>

                {/* City (Half Width) */}
                <div className="col-span-12 sm:col-span-6">
                  <TextField name='city' label="City" fullWidth required />
                </div>

                {/* State (Half Width) */}
                <div className="col-span-12 sm:col-span-6">
                  <TextField name='state'label="State / Province / Region" fullWidth required />
                </div>

                {/* Zip (Half Width) */}
                <div className="col-span-12 sm:col-span-6">
                  <TextField name='zip' label="Zip / Postal Code" fullWidth required />
                </div>

                {/* Phone (Half Width) */}
                <div className="col-span-12 sm:col-span-6">
                  <TextField label="Phone Number" name='phoneNumber' fullWidth required />
                </div>

                {/* Submit Button (Full Width) */}
                <div className="col-span-12 mt-2">
                  <Button
                    sx={{ py: 1.5, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Save and Deliver Here
                  </Button>
                </div>
                
              </div>
            </form>
          </Box>
        </div>

      </div>
    </Box>
  );
};

export default DeliveryAddressForm;