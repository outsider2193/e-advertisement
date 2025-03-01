import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, Container, CssBaseline, Grid, Typography } from "@mui/material";

import { useForm } from 'react-hook-form'
import API from '../../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import DashboardSidebar from "./DashboardSidebar";

export const Dashboard = () => {

    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, [id])

    const checkUser = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/token");
        }
        try {
            const decoded = jwtDecode(token);
            const userRole = decoded.role;
            const userId = decoded.id;
            if ((userId) !== id || userRole !== "advertiser") {
                navigate("/login");

            }
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }

    // const handlerSubmit = async (data) => {
    //     setLoading(true);
    //     try {
    //         const res = await API.post("/advertiser/createads", data);
    //         console.log(res);
    //         console.log(data);
    //         toast.success("Ad details created succesfully!");
    //     } catch (error) {
    //         toast.error("Error submitting ad", error)
    //     }
    //     setLoading(false);
    // }
    return (
        <>
            <CssBaseline />
            <DashboardSidebar/>
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0A192F",
                    color: "white",
                    py: 4,
                }}
            >
                {/* Dashboard Heading */}
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        mb: 4,
                        textTransform: "uppercase",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    Dashboard
                </Typography>

                {/* Cards Grid */}
                <Grid container spacing={3} justifyContent="center">
                    {/* Bookings Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                backgroundColor: "rgba(17, 34, 64, 0.5)", // Transparent dark blue
                                color: "white",
                                p: 3,
                                textAlign: "center",
                                borderRadius: 3,
                                boxShadow: 4,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    backgroundColor: "rgba(17, 34, 64, 0.9)", // Darker hover effect
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" mb={2}>
                                    BOOKINGS
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/bookings"
                                    variant="contained"
                                    sx={{
                                        background: "linear-gradient(to right, #2563EB, #17375E)",
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                        "&:hover": {
                                            background: "#0A74DA",
                                        },
                                    }}
                                >
                                    Manage Bookings
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Screenings/Hoarding Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                backgroundColor: "rgba(17, 34, 64, 0.5)",
                                color: "white",
                                p: 3,
                                textAlign: "center",
                                borderRadius: 3,
                                boxShadow: 4,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    backgroundColor: "rgba(17, 34, 64, 0.9)",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" mb={2}>
                                    SCREENINGS/HOARDING
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/screenings"
                                    variant="contained"
                                    sx={{
                                        background: "linear-gradient(to right, #2563EB, #17375E)",
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                        "&:hover": {
                                            background: "#0A74DA",
                                        },
                                    }}
                                >
                                    View Screens
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Ad Detail Form Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                backgroundColor: "rgba(17, 34, 64, 0.5)",
                                color: "white",
                                p: 3,
                                textAlign: "center",
                                borderRadius: 3,
                                boxShadow: 4,
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    backgroundColor: "rgba(17, 34, 64, 0.9)",
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" mb={2}>
                                    AD DETAIL FORM
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/ad-detail"
                                    variant="contained"
                                    sx={{
                                        background: "linear-gradient(to right, #2563EB, #17375E)",
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                        "&:hover": {
                                            background: "#0A74DA",
                                        },
                                    }}
                                >
                                    Create Ad
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Outlet />
        </>
    );

}
