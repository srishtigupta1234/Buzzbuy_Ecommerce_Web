import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/logo.png"; // adjust path

const Footer = () => {
  const linkClass =
    "block text-sm text-gray-300 hover:underline cursor-pointer";

  return (
    <footer className="w-full mt-20 text-gray-300">
      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-[#37475a] text-center py-3 text-sm cursor-pointer hover:bg-[#485769]"
      >
        Back to top
      </div>

      {/* Main footer */}
      <div className="bg-[#232f3e]">
        <Grid container spacing={8} className="max-w-7xl mx-auto px-16 py-16">
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="text-white font-bold mb-4">
              Get to Know Us
            </Typography>
            <span className={linkClass}>About BuzzBuy</span>
            <span className={linkClass}>Careers</span>
            <span className={linkClass}>Press Releases</span>
            <span className={linkClass}>BuzzBuy Science</span>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography className="text-white font-bold mb-4">
              Connect with Us
            </Typography>
            <span className={linkClass}>Facebook</span>
            <span className={linkClass}>Twitter</span>
            <span className={linkClass}>Instagram</span>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography className="text-white font-bold mb-4">
              Make Money with Us
            </Typography>
            <span className={linkClass}>Sell on BuzzBuy</span>
            <span className={linkClass}>Become an Affiliate</span>
            <span className={linkClass}>Advertise Your Products</span>
            <span className={linkClass}>Fulfilment by BuzzBuy</span>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography className="text-white font-bold mb-4">
              Let Us Help You
            </Typography>
            <span className={linkClass}>Your Account</span>
            <span className={linkClass}>Returns Centre</span>
            <span className={linkClass}>100% Purchase Protection</span>
            <span className={linkClass}>Help</span>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography className="text-white font-bold mb-4">
              BuzzBuy Services
            </Typography>
            <span className={linkClass}>BuzzBuy Pay</span>
            <span className={linkClass}>Gift Cards</span>
            <span className={linkClass}>Order Tracking</span>
            <span className={linkClass}>Customer Support</span>
          </Grid>
        </Grid>
      </div>

      {/* Brand strip */}
      <div className="bg-[#232f3e] border-t border-gray-700 py-6 flex flex-col items-center gap-4">
        <img src={logo} alt="BuzzBuy" className="h-20" />
        <div className="flex gap-4 text-sm">
          <span className="border border-gray-500 px-3 py-1 rounded">
            🌐 English
          </span>
          <span className="border border-gray-500 px-3 py-1 rounded">
            🇮🇳 India
          </span>
        </div>
      </div>

      {/* Bottom legal */}
      <div className="bg-[#131a22] text-xs text-gray-400 py-6 text-center">
        <div className="flex justify-center gap-4 mb-2">
          <span className="hover:underline cursor-pointer">
            Conditions of Use
          </span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">
            Interest-Based Ads
          </span>
        </div>
        <div>© {new Date().getFullYear()}, BuzzBuy.com</div>
      </div>
    </footer>
  );
};

export default Footer;
