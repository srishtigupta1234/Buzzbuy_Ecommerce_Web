import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Grid, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { deepPurple } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store.order);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20 py-10 bg-gray-50 min-h-screen font-sans">
      {/* Main Container to center everything */}
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl text-gray-800">Order Details</h1>
            <span className="text-gray-500 text-sm">Order ID: #{order.orderId}</span>
        </div>

        {/* 1. Address & Tracker Section (Grouped in a white card) */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          {/* Address */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-lg text-gray-700 mb-4">
              Delivery Address
            </h2>
            <AddressCard address={order.shippingAddress} />
          </div>

          {/* Tracker */}
          <div className="p-8 bg-gray-50/50">
             <h2 className="font-semibold text-lg text-gray-700 mb-6">
              Order Status
            </h2>
            <OrderTracker
              activeStep={
                order.orderStatus === "PLACED"
                  ? 1
                  : order.orderStatus === "DELIVERED"
                  ? 3
                  : 2
              }
            />
          </div>
        </div>

        {/* 2. Order Items Section */}
        <div className="space-y-5">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300"
            >
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                
                {/* Product Info */}
                <Grid item xs={12} sm={8}>
                  <div className="flex items-start gap-6">
                    <img
                      className="w-24 h-24 object-cover object-top rounded-md border border-gray-100"
                      src={item.product?.imageUrl || "/placeholder.png"}
                      alt={item.product?.title || "Product"}
                    />
                    <div className="space-y-2">
                      <p className="font-semibold text-lg text-gray-900 leading-tight">
                        {item.product?.title}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <p>
                          <span className="font-medium text-gray-800">Color:</span>{" "}
                          {item.product?.color || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium text-gray-800">Size:</span>{" "}
                          {item.size}
                        </p>
                        <p>
                          <span className="font-medium text-gray-800">Qty:</span>{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Seller: <span className="text-gray-700">{item.product?.seller || "Unknown"}</span>
                      </p>
                    </div>
                  </div>
                </Grid>

                {/* Price & Actions */}
                <Grid item xs={12} sm={4} className="flex flex-col sm:items-end gap-3 mt-4 sm:mt-0">
                  <p className="font-bold text-xl text-gray-900">
                    ₹{item.discountedPrice}
                  </p>
                  
                  {/* Rate Button */}
                  <Box
                    sx={{ color: deepPurple[500] }}
                    className="flex items-center gap-2 cursor-pointer hover:bg-purple-50 px-3 py-1 rounded transition-colors"
                  >
                    <StarIcon fontSize="small" />
                    <span className="text-sm font-semibold">Rate & Review</span>
                  </Box>
                </Grid>

              </Grid>
            </div>
          ))}
        </div>

        {/* 3. Footer Summary (Total & Button) */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
             <p className="text-gray-500 text-sm uppercase font-bold tracking-wide">Total Amount</p>
             <p className="font-bold text-2xl text-gray-900">₹{order.totalDiscountedPrice}</p>
          </div>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#9155fd",
              "&:hover": { bgcolor: "#7c3aed" },
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontWeight: "600",
              fontSize: "1rem",
              borderRadius: "8px",
              boxShadow: "none"
            }}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;