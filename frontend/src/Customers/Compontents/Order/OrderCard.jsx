import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/account/order/${order.id}`)}
      className="p-5 shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer max-w-4xl mx-auto my-4"
    >
      {/* Header: Order ID and Status */}
      <div className="mb-6 flex justify-between items-center p-3 rounded-md">
        <p className="font-bold text-gray-700">Order #{order.orderId}</p>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
            order.orderStatus === "DELIVERED"
              ? "text-green-600 bg-green-50 border-green-200"
              : order.orderStatus === "PLACED"
              ? "text-blue-600 bg-blue-50 border-blue-200"
              : "text-orange-500 bg-orange-50 border-orange-200"
          }`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Order Items */}
      {order.orderItems.map((item) => (
        <Grid
          container
          spacing={2}
          key={item.id}
          className="mb-4 border-b border-gray-100 pb-4 last:border-b-0"
          alignItems="center" // Vertically centers content
          justifyContent="center"
        >
          {/* 1. Product Image & Info */}
          <Grid item xs={12} sm={6}>
            <div className="flex items-center gap-4">
              <img
                src={item.product?.imageUrl || "/placeholder.png"}
                alt={item.product?.title || "Product"}
                className="w-24 h-24 object-cover object-top rounded-md border border-gray-100"
              />
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                  {item.product?.title}
                </p>
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium uppercase tracking-wide">
                  <span>Size: {item.size}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Qty: {item.quantity}</span>
                </div>
              </div>
            </div>
          </Grid>

          {/* 2. Price (Centered) */}
          <Grid item xs={6} sm={2} className="text-left sm:text-center">
             <p className="text-xs text-gray-400 font-medium sm:hidden">Price</p> {/* Mobile Label */}
            <p className="font-bold text-gray-800 text-lg">
              ${item.discountedPrice}
            </p>
          </Grid>

          {/* 3. Delivery Status (Centered/Right) */}
          <Grid item xs={6} sm={4} className="text-right sm:text-center">
            {order.orderStatus === "DELIVERED" ? (
              <div className="flex flex-col items-end sm:items-center justify-center">
                <p className="flex items-center text-green-600 font-semibold text-sm">
                  <AdjustIcon
                    sx={{ width: "16px", height: "16px" }}
                    className="mr-1"
                  />
                  Delivered
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  On {order.deliveryDate || "recent date"}
                </p>
              </div>
            ) : (
              <p className="text-sm font-medium text-gray-500">
                <span className="block text-xs text-gray-400 uppercase">
                  Est. Delivery
                </span>
                {order.expectedDelivery || "Pending"}
              </p>
            )}
          </Grid>
        </Grid>
      ))}

      {/* Footer: Total Price */}
      <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end items-center gap-3">
        <span className="text-sm font-medium text-gray-500">Order Total</span>
        <span className="text-xl font-bold text-gray-900">
          ${order.totalDiscountedPrice}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;