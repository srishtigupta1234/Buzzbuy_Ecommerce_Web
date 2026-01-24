import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddressCard from "../AddressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderHistory } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);

  // 🌟 Form state
  const [selectedAddress, setSelectedAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });

  // 🌟 Load user order history to get saved addresses
  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  // 🌟 Handle click on "Deliver Here" button
  const handleDeliverHere = (address) => {
    setSelectedAddress({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      streetAddress: address.streetAddress || "",
      city: address.city || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
      mobile: address.mobile || "",
    });
  };

  // 🌟 Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        address: selectedAddress,
        navigate,
      })
    );
  };

  // 🌟 Extract unique addresses from order history
  const addresses =
    orders?.length > 0
      ? Array.from(
          new Map(
            orders.map((order) => [order.shippingAddress.id, order.shippingAddress])
          ).values()
        )
      : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT SECTION: Saved Addresses */}
      <div className="lg:col-span-4 h-fit">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
            <LocalShippingIcon className="text-gray-400" />
            <h2 className="font-bold text-gray-700">Saved Addresses</h2>
          </div>

          <div className="p-4 max-h-120 overflow-y-auto custom-scrollbar">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#9155fd] transition-colors mb-4"
              >
                <AddressCard address={address} />

                <Button
                  sx={{
                    mt: 2,
                    bgcolor: "#9155fd",
                    "&:hover": { bgcolor: "#7c3aed" },
                  }}
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={() => handleDeliverHere(address)}
                >
                  Deliver Here
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: New Address Form */}
      <div className="lg:col-span-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 lg:p-8">
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 4, color: "#374151" }}
          >
            Add / Edit Delivery Address
          </Typography>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                required
                value={selectedAddress.firstName}
                onChange={(e) =>
                  setSelectedAddress({ ...selectedAddress, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                required
                value={selectedAddress.lastName}
                onChange={(e) =>
                  setSelectedAddress({ ...selectedAddress, lastName: e.target.value })
                }
              />

              <div className="md:col-span-2">
                <TextField
                  label="Street Address"
                  name="address"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  value={selectedAddress.streetAddress}
                  onChange={(e) =>
                    setSelectedAddress({ ...selectedAddress, streetAddress: e.target.value })
                  }
                />
              </div>

              <TextField
                label="City"
                name="city"
                fullWidth
                required
                value={selectedAddress.city}
                onChange={(e) =>
                  setSelectedAddress({ ...selectedAddress, city: e.target.value })
                }
              />
              <TextField
                label="State / Province"
                name="state"
                fullWidth
                required
                value={selectedAddress.state}
                onChange={(e) =>
                  setSelectedAddress({ ...selectedAddress, state: e.target.value })
                }
              />
              <TextField
                label="Zip / Postal Code"
                name="zip"
                fullWidth
                required
                value={selectedAddress.zipCode}
                onChange={(e) =>
                  setSelectedAddress({ ...selectedAddress, zipCode: e.target.value })
                }
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                fullWidth
                required
                value={selectedAddress.mobile}
                onChange={(e) =>
                  setSelectedAddress({ ...selectedAddress, mobile: e.target.value })
                }
              />

              <div className="md:col-span-2 mt-4">
                <Button
                  sx={{
                    py: 1.5,
                    bgcolor: "#9155fd",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#7c3aed" },
                  }}
                  size="large"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Save and Deliver Here
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
