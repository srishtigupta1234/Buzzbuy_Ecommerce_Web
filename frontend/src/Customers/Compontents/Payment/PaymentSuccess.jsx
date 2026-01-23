import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
import {
  Alert,
  AlertTitle,
  Grid,
  Divider,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import OrderTracker from "../Order/OrderTracker";
import AddressCard from "../AddressCard/AddressCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const [referenceId, setReferenceId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentId(params.get("razorpay_payment_id")); // ✅ CORRECT
    setPaymentStatus(params.get("razorpay_payment_link_status"));
    setReferenceId(params.get("razorpay_payment_link_reference_id"));
  }, []);

  useEffect(() => {
    const data = { orderId, paymentId };
    dispatch(getOrderById(orderId));
    if (paymentId) {
      dispatch(updatePayment(data)); // ✅ only when valid
    }
  }, [orderId, paymentId]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 lg:px-32 py-6">
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 3 } }}>
        {/* 1. Header & Success Banner */}
        <div className="flex flex-col justify-center items-center mb-10">
          <Alert
            icon={<CheckCircleOutlineIcon fontSize="inherit" />}
            variant="filled"
            severity="success"
            sx={{
              mb: 4,
              width: "100%",
              maxWidth: "600px",
              borderRadius: 3,
              bgcolor: "#00a152", // Custom success green
              boxShadow: 3,
            }}
          >
            <AlertTitle sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Payment Successful!
            </AlertTitle>
            <Typography variant="body2">
              Your order has been confirmed. Thank you for shopping with us!
            </Typography>
          </Alert>

          {/* Order Tracker */}
          <Box sx={{ width: "100%", maxWidth: "800px" }}>
            <OrderTracker activeStep={1} />
          </Box>
        </div>
        <div className="flex justify-center items-center">
          {/* 2. Main Content Grid */}
          <Grid container spacing={4}>
            {/* Left Column: Order Items */}
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 3, boxShadow: 1, mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Order Items
                  </Typography>
                  <div className="space-y-5 mt-4">
                    {order.order?.orderItems?.map((item, index) => (
                      <div key={index} className="flex gap-5 items-start">
                        {/* Image Container */}
                        <div className="w-24 h-24 shrink-0">
                          <img
                            className="w-full h-full object-cover rounded-md border border-gray-200"
                            src={
                              item.product?.imageUrl ||
                              "https://via.placeholder.com/150"
                            }
                            alt={item.product?.title}
                          />
                        </div>

                        {/* Text Details */}
                        <div className="flex-1">
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            lineHeight={1.2}
                          >
                            {item.product?.title}
                          </Typography>

                          <div className="flex items-center gap-3 mt-1 text-gray-500 text-sm">
                            <span>Size: {item.size}</span>
                            <Divider
                              orientation="vertical"
                              flexItem
                              height={15}
                            />
                            <span>Color: {item.color}</span>
                          </div>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 0.5 }}
                          >
                            Seller: {item.product?.brand}
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="#9155fd"
                            sx={{ mt: 1 }}
                          >
                            ₹{item.price}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column: Address & Summary (Sticky on Desktop) */}
            <Grid item xs={12} md={4}>
              <div className="sticky top-20 space-y-5">
                {/* Address Card */}
                <Card
                  sx={{ borderRadius: 3, boxShadow: 1, bgcolor: "#fafafa" }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Delivery Address
                    </Typography>
                    <div className="mt-3 text-sm text-gray-600">
                      <AddressCard address={order.order?.shippingAddress} />
                    </div>
                  </CardContent>
                </Card>

                {/* Price Summary */}
                <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
                  <CardContent className="space-y-3">
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Order Summary
                    </Typography>

                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{order.order?.totalPrice}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Discount</span>
                      <span className="text-green-600 font-medium">
                        -₹{order.order?.discount}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>

                    <Divider sx={{ my: 1 }} />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span style={{ color: "#9155fd" }}>
                        ₹{order.order?.totalDiscountedPrice}
                      </span>
                    </div>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        bgcolor: "#9155fd",
                        py: 1.5,
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#7c3aed" },
                      }}
                      onClick={() => navigate("/")} // Add navigation here
                    >
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default PaymentSuccess;
