import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  };

  // 1. Handle Empty Cart State
  if (!cart?.cartItems || cart.cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
          <ShoppingBagIcon sx={{ fontSize: 48 }} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ bgcolor: "#9155fd", "&:hover": { bgcolor: "#7c3aed" } }}
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-12">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        
        {/* NEW HEADER DESIGN: Clean, Aligned, & Functional */}
        <div className="flex items-end justify-between mb-6">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Review your items before checkout
                </p>
            </div>
            
            {/* Continue Shopping Button (Desktop only) */}
            <div className="hidden sm:block">
                <Button 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    sx={{ 
                        textTransform: 'none', 
                        fontWeight: 600, 
                        color: '#9155fd',
                        '&:hover': { color: '#7c3aed', bgcolor: 'transparent' }
                    }}
                >
                    Continue Shopping
                </Button>
            </div>
        </div>

        {/* Content Grid */}
        <div className="lg:grid grid-cols-12 gap-8 relative">
            
          {/* Left Side: Cart Items List */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {cart?.cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                
                <div className="p-5 bg-gray-50 border-b border-gray-100">
                  <h3 className="uppercase font-bold text-gray-600 text-sm tracking-wide">
                    Order Summary
                  </h3>
                </div>

                <div className="p-6 space-y-5">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Price ({cart?.totalItem} items)</span>
                      <span className="font-medium text-gray-900">₹{cart?.totalPrice}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Discount</span>
                      <span className="font-medium text-green-600">- ₹{cart?.discount}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charges</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-gray-200 my-4"></div>

                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-[#9155fd]">
                      ₹{cart?.totalDiscountedPrice}
                    </span>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    onClick={handleCheckOut}
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      bgcolor: "#9155fd",
                      py: 1.5,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textTransform: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(145, 85, 253, 0.2)",
                      "&:hover": { 
                        bgcolor: "#7c3aed",
                        boxShadow: "0 6px 16px rgba(145, 85, 253, 0.3)"
                      },
                    }}
                  >
                    Checkout Securely
                  </Button>
                  
                  {cart?.discount > 0 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100 text-center">
                      <p className="text-sm text-green-700 font-medium">
                        You will save ₹{cart?.discount} on this order!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;