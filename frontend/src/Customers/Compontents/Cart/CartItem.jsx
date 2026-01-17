import React from "react";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item.id));
  };
  const handleIncreaseCartItem = (num) => {
    const updatedQuantity = item.quantity + num;
    dispatch(
      updateCartItem({
        cartItemId: item.id,
        data: { quantity: updatedQuantity } 
      })
    );
  };
  const handleDecreaseCartItem = (num) => {
    const updatedQuantity = item.quantity + num;
    dispatch(
      updateCartItem({
        cartItemId: item.id,
        data: { quantity: updatedQuantity } 
      })
    );
  };

  return (
    <div className="p-5 shadow-sm border border-gray-400 rounded-lg hover:shadow-md transition-all duration-300 bg-white">
      <div className="flex items-center">
        {/* Product Image */}
        <div className="w-24 h-24 lg:w-32 lg:h-32 shrink-0">
          <img
            className="w-full h-full object-cover object-top rounded-md border border-gray-100"
            src={item.product?.imageUrl || "https://via.placeholder.com/150"}
            alt={item.product?.title || "Product"}
          />
        </div>

        {/* Product Details */}
        <div className="ml-5 space-y-1 flex-1">
          <p className="font-bold text-gray-800 lg:text-base line-clamp-1">
            {item.product?.title}
          </p>
          <p className="text-sm font-medium text-gray-500">Size: {item.size}</p>
          <p className="text-sm text-gray-400">Seller: {item.product?.brand}</p>

          {/* Pricing Section */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-lg font-black text-gray-900">
              ${item.product?.discountedPrice}
            </span>
            <span className="line-through text-gray-400 text-sm">
              ${item.product?.price}
            </span>
            {item?.discount > 0 && (
              <span className="text-green-600 font-bold text-sm tracking-tight">
                {item?.discount}% Off
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex items-center justify-between lg:justify-start lg:space-x-10 pt-4 mt-4 border-t border-gray-50">
        <div className="flex items-center space-x-1">
          <IconButton
            sx={{ color: "#9155fd", "&:hover": { bgcolor: "#f5f3ff" } }}
            size="small"
            disabled={item.quantity <= 1}
            onClick={() => handleDecreaseCartItem()}
          >
            <RemoveCircleOutlineIcon fontSize="medium" />
          </IconButton>

          <span className="w-10 text-center font-semibold text-gray-700 select-none">
            {item.quantity}
          </span>

          <IconButton
            sx={{ color: "#9155fd", "&:hover": { bgcolor: "#f5f3ff" } }}
            size="small"
            disabled={item.quantity >= item?.product.qunatity} // Disables at 30
            onClick={() => handleIncreaseCartItem(1)}
          >
            <AddCircleOutlineIcon fontSize="medium" />
          </IconButton>
        </div>

        <div>
          <Button
            sx={{
              color: "#9155fd",
              fontWeight: 700,
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              "&:hover": { bgcolor: "transparent", color: "#7c3aed" },
            }}
            onClick={()=>handleRemoveCartItem(-1)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
