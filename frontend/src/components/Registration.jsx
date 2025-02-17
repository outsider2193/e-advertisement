import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import API from '../api/axios';
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validations = {
        nameValidation: {
            required: {
                value: true,
                message: "firstname is required"
            },
            minLength: {
                value: 2,
                message: "name should be atleast 2 characters long!"
            }
        },
        lastNameValidation: {
            required: {
                value: true,
                message: "lastname is required"
            }
        },
        emailValidation: {
            required: {
                value: true,
                message: "email is required"
            },
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is invalid !"
            }
        },
        passwordValidation: {
            required: {
                value: true,
                message: "password is required"
            },
            pattern: {
                value: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/,
                message: "password should contain atleast 1 lowercase, 1 uppercase, 1 digit, and 1 special character"
            }
        }
    }
    const handlerSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await API.post("/auth/register", data);
            // console.log("Registration succesfull"
            toast.success("Registration succesfull!");
            navigate("/login")
        }
        catch (error) {
            // console.log(error.response?.data?.message);
            toast.error("Registration failed ", error.response?.data?.message);
        }
        setLoading(false);
    }

    return (
        // <div style={{ textAlign: "center" }}>
        //     <h1> Registraion </h1>

        //     <form onSubmit={handleSubmit(handlerSubmit)}>

        //         <div>
        //             <label>Firstname:</label>
        //             <input type='text' placeholder='enter your firstname here '{...register("firstName", validations.nameValidation)}></input>
        //             <span>
        //                 {
        //                     errors.firstname?.message
        //                 }
        //             </span>
        //         </div>
        //         <div>
        //             <label>lastName:</label>
        //             <input type='text' placeholder='enter your lastname here '{...register("lastName", validations.lastNameValidation)}></input>
        //             <span>
        //                 {
        //                     errors.lastName?.message
        //                 }
        //             </span>
        //         </div>
        //         <div>
        //             <label>Email:</label>
        //             <input type='email' placeholder='enter your email here '{...register("email", validations.emailValidation)}></input>
        //             <span>
        //                 {
        //                     errors.email?.message
        //                 }
        //             </span>
        //         </div>
        //         <div>                <label>Password:</label>
        //             <input type='text' placeholder='enter your password here '{...register("password", validations.passwordValidation)}></input>
        //             <span>
        //                 {
        //                     errors.password?.message
        //                 }
        //             </span>
        //         </div>
        //         <input type="submit" disabled={loading} value={loading ? "Registering..." : "Register"} />
        //         <div>

        //         </div>

        //     </form>
        // </div>
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 5,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    bgcolor: "white"
                }}
            >
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Registration
                </Typography>

                <form onSubmit={handleSubmit(handlerSubmit)}>
                    <TextField
                        fullWidth
                        label="First Name"
                        {...register("firstName", validations.nameValidation)}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        {...register("lastName", validations.lastNameValidation)}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        sx={{ mb: 2 }}
                    />
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
                        type="text  "
                        {...register("password", validations.passwordValidation)}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Already have an account? <Link to="/login">Login here</Link>
                    </Typography>
                </form>
            </Box>
        </Container>


    )
}

export default Registration
//YOgesh!0vesD@@#
//VE3gil!011