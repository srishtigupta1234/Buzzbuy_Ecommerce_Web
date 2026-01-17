import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ProductReviewCard from "./ProductReviewCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { kurta } from "../../../Data/mens_kurta";
import HomeSectionCard from "../HomeSectionCards/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { addItemToCart } from "../../../State/Cart/Action";

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.products); // assuming your reducer key is 'products'

  useEffect(() => {
    if (params.productId) {
      dispatch(findProductsById({ productId: params.productId }));
    }
  }, [params.productId, dispatch]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    // Default quantity to 1
    const reqData = {
      productId: params.productId,
      size: selectedSize,
      quantity: 1, // <-- Add this!
    };

    dispatch(addItemToCart(reqData));
    navigate("/cart");
  };

  // Show loader until product is loaded
  if (!product) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-7xl space-x-2 px-4">
            {product.breadcrumbs?.map((item) => (
              <li key={item.id} className="text-sm text-gray-500">
                {item.name} /
              </li>
            ))}
            <li className="text-sm font-medium text-gray-700">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10 px-4">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-lg max-w-md mx-auto">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full object-cover"
              />
            </div>

            <div className="flex gap-3 justify-center">
              {product.images?.map((img, i) => (
                <div
                  key={i}
                  className="w-20 h-20 overflow-hidden rounded-lg cursor-pointer border"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="max-w-lg">
            <h1 className="text-sm font-semibold text-gray-500 uppercase">
              {product.brand}
            </h1>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              {product.title}
            </h2>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold">
                ${product.discountedPrice}
              </span>
              <span className="line-through text-gray-400">
                ${product.price}
              </span>
              <span className="text-green-600 font-semibold">
                {product.discountPercent}% Off
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <Rating value={2.5} precision={0.5} readOnly size="small" />
              <span className="text-sm text-gray-500">56,540 Ratings</span>
            </div>

            {/* Sizes */}
            <div className="mt-8">
              <h3 className="text-sm font-medium">Size</h3>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.sizes?.map((size) => (
                  <label
                    key={size.name}
                    className={`border rounded-md p-3 text-center cursor-pointer hover:border-indigo-500 ${
                      selectedSize === size.name
                        ? "border-indigo-500 bg-indigo-50"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.name}
                      className="hidden"
                      onChange={() => setSelectedSize(size.name)}
                    />
                    {size.name}
                  </label>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              variant="contained"
              sx={{ mt: 3, bgcolor: "#9155fd", px: 4, py: 1.5 }}
            >
              Add To Cart
            </Button>

            {/* Description */}
            <div className="mt-10 space-y-4">
              <p className="text-gray-700">{product.description}</p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {product.highlights?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">{product.details}</p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16 px-3">
          <h1 className="py-5 text-xl font-bold">Recent Review & Rating</h1>

          <div className="border border-gray-300 p-5">
            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                {[1, 2, 3].map((_, i) => (
                  <ProductReviewCard key={i} />
                ))}
              </Grid>

              <Grid item xs={12} md={5}>
                <h2 className="text-xl font-semibold">Product Ratings</h2>

                <div className="flex items-center gap-3 mt-1 mb-4">
                  <Rating value={4.6} precision={0.5} readOnly />
                  <p className="opacity-60">235,678 Ratings</p>
                </div>
                {[
                  ["Excellent", 80, "#22c55e"],
                  ["Very Good", 50, "#84cc16"],
                  ["Good", 30, "#EAB308"],
                  ["Average", 20, "#f97316"],
                  ["Poor", 15, "#ef4444"],
                ].map(([label, value, color]) => (
                  <Box
                    key={label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Box sx={{ minWidth: 85 }}>
                      <p className="text-sm font-medium text-gray-700">
                        {label}
                      </p>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={value}
                        sx={{
                          height: 8,
                          width: "100%",
                          borderRadius: 4,
                          backgroundColor: "#f3f4f6",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            backgroundColor: color,
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ minWidth: 40, textAlign: "right" }}>
                      <p className="text-sm text-gray-400 font-medium">
                        {value}%
                      </p>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="flex flex-wrap space-y-6">
            {kurta.map((item) => (
              <HomeSectionCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
