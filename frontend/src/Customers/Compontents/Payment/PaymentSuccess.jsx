import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
import { Box, Button, Grid, Typography, Divider } from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import AddressCard from "../AddressCard/AddressCard";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentId(params.get("razorpay_payment_id"));
  }, []);

  useEffect(() => {
    if (orderId) {
      const data = { orderId, paymentId };
      dispatch(getOrderById(orderId));
      if (paymentId) {
        dispatch(updatePayment(data));
      }
    }
  }, [orderId, paymentId, dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* 1. Success Hero Banner */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
            <CheckCircleIcon sx={{ fontSize: 50, color: '#16a34a' }} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 font-medium">
             Order ID: <span className="text-gray-900">#{orderId}</span>
          </p>

          {/* Tracking Stepper */}
          <div className="mt-10 w-full max-w-3xl mx-auto">
             <OrderTracker activeStep={1} />
          </div>
        </div>

        {/* 2. Main Content Grid */}
        <Grid container spacing={4}>
          
          {/* Left Column: Items List */}
          <Grid item xs={12} lg={8}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="font-bold text-gray-700">Items Purchased</h2>
                <span className="text-sm text-gray-500">{order.order?.orderItems?.length} items</span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {order.order?.orderItems?.map((item, index) => (
                  <div key={index} className="p-6 flex gap-6 hover:bg-gray-50/50 transition-colors">
                    {/* Image */}
                    <div className="w-24 h-24 shrink-0 rounded-lg border border-gray-200 overflow-hidden bg-gray-100">
                      <img
                        className="w-full h-full object-cover object-top"
                        src={item.product?.imageUrl}
                        alt={item.product?.title}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                            {item.product?.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">{item.product?.brand}</p>
                        </div>
                        <p className="font-bold text-gray-900 text-lg">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          Size: {item.size}
                        </span>
                        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          Color: {item.product?.color}
                        </span>
                        <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>

          {/* Right Column: Logistics & Price */}
          <Grid item xs={12} lg={4}>
            <div className="space-y-6 sticky top-6">
              
              {/* Shipping Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4">
                  Delivery Details
                </h3>
                <div className="pl-3 border-l-3 border-[#9155fd]">
                   <AddressCard address={order.order?.shippingAddress} />
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider mb-4">
                  Payment Summary
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{order.order?.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600 font-medium">- ₹{order.order?.discount}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  
                  <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                  
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Paid</span>
                    <span className="text-[#9155fd]">₹{order.order?.totalDiscountedPrice}</span>
                  </div>
                </div>

                <div className="mt-6">
                   <Button
                      onClick={() => navigate("/")}
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#9155fd",
                        py: 1.5,
                        fontWeight: "bold",
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#7c3aed", boxShadow: "none" },
                      }}
                    >
                      Continue Shopping
                    </Button>
                </div>
              </div>

            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PaymentSuccess;