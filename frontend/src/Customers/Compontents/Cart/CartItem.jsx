import React from "react";
import { IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { getCart, removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveCartItem = async () => {
    await dispatch(removeCartItem(item.id));
    dispatch(getCart());
  };

  const handleUpdateCartItem = async (newQty) => {
    if (newQty < 1) return;
    await dispatch(
      updateCartItem({
        cartItemId: item.id,
        data: { quantity: newQty },
      })
    );
    dispatch(getCart());
  };

  return (
    <div className="group p-4 sm:p-6 shadow-sm border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-all duration-300 relative">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        
        {/* Product Image */}
        <div className="w-full sm:w-32 h-32 shrink-0 overflow-hidden rounded-lg bg-gray-100 relative">
          <img
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            src={item.product?.imageUrl || "https://via.placeholder.com/150"}
            alt={item.product?.title}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-bold text-gray-900 text-lg leading-tight line-clamp-2">
                {item.product?.title}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <p className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-gray-600">
                  Size: {item.size}
                </p>
                <p>•</p>
                <p className="text-gray-400">{item.product?.brand}</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 pt-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{item.product?.discountedPrice}
            </span>
            <span className="line-through text-gray-400 text-sm mb-1">
              ₹{item.product?.price}
            </span>
            {item?.discount > 0 && (
              <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold mb-1">
                {item?.discount}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-100" />

      {/* Controls Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Quantity Stepper */}
        <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-full px-1 py-1">
          <IconButton
            size="small"
            disabled={item.quantity <= 1}
            onClick={() => handleUpdateCartItem(item?.quantity - 1)}
            sx={{ color: item.quantity <= 1 ? "grey.300" : "#9155fd" }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <span className="w-8 text-center font-bold text-gray-700 text-sm">
            {item.quantity}
          </span>

          <IconButton
            size="small"
            onClick={() => handleUpdateCartItem(item?.quantity + 1)}
            sx={{ color: "#9155fd" }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>

        {/* Remove Action */}
        <Button
          onClick={handleRemoveCartItem}
          variant="text"
          size="small"
          sx={{
            color: "#ef4444",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": { bgcolor: "#fef2f2" },
          }}
        >
          REMOVE
        </Button>
      </div>
    </div>
  );
};

export default CartItem;