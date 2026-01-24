import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../State/Order/Action";

const OrderStatus = [
  { label: "On The Way", value: "PLACED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Returned", value: "RETURNED" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.order);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  const handleFilterChange = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const filteredOrders = filters.length
    ? orders.filter((o) => filters.includes(o.orderStatus))
    : orders;

  return (
    <div className="px-4 py-8 lg:px-10 lg:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 top-20 h-auto">
              <h2 className="font-bold text-xl text-gray-800 mb-6 border-b pb-2">
                Filters
              </h2>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wider">
                  Order Status
                </h3>
                <div className="space-y-3">
                  {OrderStatus.map((option) => (
                    <div className="flex items-center" key={option.value}>
                      <input
                        id={option.value}
                        type="checkbox"
                        value={option.value}
                        checked={filters.includes(option.value)}
                        onChange={() => handleFilterChange(option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <label
                        htmlFor={option.value}
                        className="ml-3 text-sm text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Grid>

          {/* --- ORDER LIST --- */}
          <Grid item xs={12} md={9}>

            <div className="space-y-6">
              {filteredOrders && filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard key={order.id ?? order.orderId} order={order} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-md shadow-sm border border-gray-200">
                  <p className="text-gray-500 text-lg font-medium">
                    No orders found.
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </Grid>
          
        </Grid>
      </div>
    </div>
  );
};

export default Order;