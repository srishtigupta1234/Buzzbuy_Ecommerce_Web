import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../State/Auth/Action";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(user))
    console.log(user);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box className="bg-white border border-gray-400 rounded-lg shadow-sm p-8 max-w-xl mx-auto">
        <Typography variant="h6" fontWeight="bold" mb={4}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-4">
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
                Login
              </Button>
            </div>
          </div>
        </form>
        <div className="flex justify-center">
          <div className="py-3 flex items-center">
            <p>Don't have account ?</p>
            <Button
              onClick={() => navigate(`/register`)}
              className="ml-5"
              size="small"
            >
              Register
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default LoginForm;
