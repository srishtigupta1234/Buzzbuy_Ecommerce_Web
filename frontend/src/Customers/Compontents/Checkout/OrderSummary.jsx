import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../../State/Payment/Action";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order } = useSelector((store) => store);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };

  return (
    <div className="space-y-6">
        
      {/* 1. Address Banner */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <LocationOnIcon className="text-[#9155fd]" />
            <h3 className="font-bold text-gray-700 text-lg">Shipping Address</h3>
        </div>
        <div className="pl-2">
            <AddressCard address={order.order?.shippingAddress} />
        </div>
      </div>

      {/* 2. Order Details & Payment Summary */}
      <div className="lg:grid grid-cols-12 gap-8 relative">
        
        {/* Left: Order Items List */}
        <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-bold text-gray-700">Order Items</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {order.order?.orderItems.map((item) => (
                        <div className="p-6 flex gap-4" key={item.id}>
                             <div className="w-20 h-20 overflow-hidden rounded-md border border-gray-200 shrink-0">
                                <img 
                                    src={item.product?.imageUrl} 
                                    alt={item.product?.title} 
                                    className="w-full h-full object-cover object-top"
                                />
                             </div>
                             <div className="flex-1">
                                <h4 className="font-bold text-gray-800 line-clamp-1">{item.product?.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                                <p className="text-sm text-gray-400">{item.product?.brand}</p>
                                
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="font-bold text-gray-900">₹{item.discountedPrice}</span>
                                    <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                        {item.product?.discountPersent}% OFF
                                    </span>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right: Sticky Price Summary */}
        <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
          <div className="sticky top-10">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-4">
                Price Details
              </h2>
              <hr className="border-gray-100 mb-4" />

              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between text-gray-600">
                  <span>Price ({order.order?.totalItem} items)</span>
                  <span className="text-gray-900">₹{order.order?.totalPrice}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="text-green-600">- ₹{order.order?.discount}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>

                <hr className="border-dashed border-gray-200 my-4" />

                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-[#9155fd]">₹{order.order?.totalDiscountedPrice}</span>
                </div>
              </div>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  bgcolor: "#9155fd",
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#7c3aed" },
                }}
                onClick={handleCheckout}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;