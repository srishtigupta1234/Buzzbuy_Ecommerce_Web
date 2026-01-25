import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser, register } from "../../State/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../State/store";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt,auth.jwt]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const user = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(register(user));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="bg-white border border-gray-400 rounded-lg shadow-sm p-8 max-w-xl mx-auto">
        <Typography variant="h6" fontWeight="bold" mb={4}>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* FORM GRID */}
          <div className="grid grid-cols-12 gap-4">
            {/* First Name */}
            <div className="col-span-12 sm:col-span-6">
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                required
              />
            </div>

            {/* Last Name */}
            <div className="col-span-12 sm:col-span-6">
              <TextField label="Last Name" name="lastName" fullWidth required />
            </div>

            {/* Email */}
            <div className="col-span-12">
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
              />
            </div>

            {/* Password */}
            <div className="col-span-12">
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-12 mt-2">
              <Button
                sx={{ py: 1.5, bgcolor: "RGB(145 85 253)" }}
                size="large"
                variant="contained"
                fullWidth
                type="submit"
              >
                Register
              </Button>
            </div>
          </div>
        </form>

        <div className="flex justify-center">
          <div className="py-3 flex items-center">
            <p>If you have already account ?</p>
            <Button
              onClick={() => navigate(`/login`)}
              className="ml-5"
              size="small"
            >
              Login
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default RegisterForm;
