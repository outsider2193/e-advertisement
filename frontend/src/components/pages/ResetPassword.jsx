import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import API from "../../api/axios";
import { jwtDecode } from "jwt-decode"; // ✅ Import decoder

const ResetPassword = () => {
  const { token, role } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // token & role are already from useParams
      const payload = {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword, // optional if backend checks it
      };
  
      const res = await API.post(`/auth/reset-password/${role}/${token}`, payload);
  
      toast.success(res.data.message, {
        position: "top-center",
        transition: Bounce,
      });
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password reset failed",
        { position: "top-center", transition: Bounce }
      );
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              pattern: {
                value: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
                message: "Password must meet complexity requirements",
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match"
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Reset Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
