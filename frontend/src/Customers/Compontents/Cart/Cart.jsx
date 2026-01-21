import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const { cart } = useSelector(state => state.cart);


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);



  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="lg:grid grid-cols-3 lg:px-16 px-4 pt-10 relative gap-5">
        {/* Left Side: Cart Items */}
        <div className="col-span-2 space-y-4">
          {cart?.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
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
                <span>Price ({cart?.totalItem} items)</span>
                {/* Display calculated Total */}
                <span>${cart?.totalPrice}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Discount</span>
                {/* Display calculated Discount */}
                <span className="text-green-600">-₹{cart?.discount}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>

              <hr className="border-dashed border-gray-200" />

              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total Amount</span>
                {/* Display calculated Final Price */}
                <span className="text-[#9155fd]">
                  {" "}
                  ₹{cart?.totalDiscountedPrice}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCheckOut}
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
                bgcolor: "#9155fd",
                py: "0.8rem",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": { bgcolor: "#7c3aed" },
              }}
            >
              Checkout
            </Button>

            <p className="text-xs text-green-600 font-semibold mt-4 text-center">
              You will save ${cart?.discount} on this order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
