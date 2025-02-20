
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import API from '../../api/axios';
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { toast, Bounce } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (data) => {
        setLoading(true)
        try {
            const response = await API.post("/auth/login", data)
            const token = res.data?.token;
            if (!token) {
                console.log("Token not received from the server");
            }
            localStorage.setItem("token", token);
            console.log("token:", token);
            // navigate("/dashboard");
            console.log("logged in")
            toast.success("Successfully logged in!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error("Login Failed.Please check your credentials", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }


        } finally {
            setLoading(false);
        }
    }
    const validations = {
        emailValidation: {
            required: {
                value: true,
                message: "Email is required"
            },
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is invalid !"
            }
        },
        passwordValidation: {
            required: {
                value: true,
                message: "Password is required"
            },
            pattern: {
                value: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
                message: "password should contain atleast 1 lowercase, 1 uppercase, 1 digit, and 1 special character"
            }
        }
    }
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...register("email", validations.emailValidation)}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        {...register("password", validations.passwordValidation)}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    <Typography variant='body2'
                        sx={{ mt: 2, textAlign: "center" }}>
                        Don't have an account? <Link to="/register">Register here</Link>

                    </Typography>
                </form>
            </Box>
        </Container>
    )
}

export default Login
//Dhanush!@2807