import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = () => {
  return (
    <header className="w-full bg-[#232f3e]  text-white">
      <div className="flex items-center gap-4 px-4 py-2">

        {/* Logo */}
        <div className="flex items-center gap-1 cursor-pointer">
          <img src="/logo2.png" alt="BuzzBuy" className="h-8" />
          <span className="text-xs mt-2">.in</span>
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-1 cursor-pointer">
          <LocationOnOutlinedIcon fontSize="small" />
          <div className="leading-tight">
            <p className="text-xs text-gray-300">Delivering to</p>
            <p className="text-sm font-bold">Bhopal 462001</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center h-10 rounded overflow-hidden bg-white">

          {/* Category */}
          <select className="h-full px-2 bg-gray-200 text-black text-sm outline-none">
            <option>All</option>
            <option>Fashion</option>
            <option>Electronics</option>
            <option>Beauty</option>
          </select>

          {/* Input */}
          <input
            type="text"
            placeholder="Search BuzzBuy"
            className="flex-1 px-3 text-black outline-none"
          />

          {/* Search Icon */}
          <button className="h-full px-4 bg-[#febd69] text-black">
            <SearchIcon />
          </button>
        </div>

        {/* Language */}
        <div className="hidden md:flex items-center gap-1 cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="IN"
            className="w-5"
          />
          <span className="text-sm">EN</span>
          <KeyboardArrowDownIcon fontSize="small" />
        </div>

        {/* Account */}
        <div className="hidden md:flex flex-col cursor-pointer leading-tight">
          <span className="text-xs">Hello, Sign in</span>
          <span className="text-sm font-bold">
            Account & Lists <KeyboardArrowDownIcon fontSize="small" />
          </span>
        </div>

        {/* Orders */}
        <div className="hidden md:flex flex-col cursor-pointer leading-tight">
          <span className="text-xs">Returns</span>
          <span className="text-sm font-bold">& Orders</span>
        </div>

        {/* Cart */}
        <div className="flex items-center cursor-pointer gap-1">
          <ShoppingCartOutlinedIcon />
          <span className="font-bold">Cart</span>
        </div>

      </div>
    </header>
  );
};

export default Header;
