import { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { useLocation } from "react-router-dom";
import CartItem from "../Cart/CartItem";

const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {order} = useSelector(store=>store)
    const searchParams = new URLSearchParams(location.search);
    const orderId =  searchParams.get("order_id");

    useEffect(()=>{
       dispatch(getOrderById(orderId)); 
    },[orderId])

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border border-gray-400">
        <AddressCard  address={order.order?.shippingAddress}/>
      </div>
       <div className="bg-gray-50 min-h-screen pb-10">
      {/* Main Container */}
      <div className="lg:grid grid-cols-3 px-4 pt-10 relative gap-5">
        
        {/* Left Side: Cart Items */}
        <div className="col-span-2 space-y-4">
          {order.order?.orderItems.map((item) => (
            <CartItem item={item} />
          ))}
        </div>

        {/* Right Side: Sticky Price Summary */}
        <div className="px-5 sticky top-5 h-max mt-10 lg:mt-0">
          <div className="border border-gray-500 bg-white rounded-md shadow-sm p-5">
            <p className="uppercase font-bold text-gray-500 pb-4 text-sm tracking-wide">
              Price Details
            </p>
            <hr className="border-gray-100" />
            
            <div className="space-y-4 font-medium mt-5">
              <div className="flex justify-between text-gray-700">
                <span>Price ({order.order?.totalItem} items)</span>
                <span>${order.order?.totalPrice}</span>
              </div>
              
              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                <span className="text-green-600">-${order.order?.discount}</span>
              </div>
              
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <hr className="border-dashed border-gray-200" />
              
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total Amount</span>
                <span className="text-[#9155fd]">${order.order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              variant="contained"
              fullWidth
              sx={{ 
                mt: 4, 
                bgcolor: "#9155fd", 
                py: "0.8rem",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": { bgcolor: "#7c3aed" }
              }}
            >
              Checkout
            </Button>

            <p className="text-xs text-green-600 font-semibold mt-4 text-center">
              You will save ${order.order?.discount} on this order
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderSummary;
