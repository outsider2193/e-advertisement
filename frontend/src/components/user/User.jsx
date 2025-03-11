import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import bgImage from "../assets/UserBackground.jpg";
export const User = () => {

    const user = (localStorage.getItem("user")) || {};

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await API.get("/ads");
                setAds(res.data);
            } catch (error) {
                console.log("Error Fetching Ads:", error);
            } finally {
                setLoading(false);
            }

        };
        fetchAds();
    }, []);
    return (
        <Container  maxWidth="xl"
                    disableGutters // Removes MUI default margins
                    sx={{
                        width: "100vw",
                        height: "100vh",
                        overflowX: "hidden",
                        backgroundImage:`url(${bgImage})`, 
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        display: "flex", // Enables flexbox for centering
                        flexDirection: "column", // Stack elements vertically
                        alignItems: "center", // Centers horizontally
                        justifyContent: "center", // Centers vertically
                        textAlign: "center", // Ensures text inside is centered
                        padding: 4, // Adds some spacing
                      }}>
            {/* Welcome Section */}
            <Typography variant="h4" gutterBottom>
                Welcome, {user?.name || "User"}! 🎉
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                Explore the latest ads and find what you need.
            </Typography>

            {/* Quick Access Cards */}
            <Grid container spacing={3} sx={{ my: 3 }}>
                {[
                    { title: "Browse Ads", link: "/ads" },
                    { title: "Saved Ads", link: "/saved-ads" },
                    { title: "Post an Ad", link: "/post-ad" },
                ].map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Card
                            component={Link}
                            to={item.link}
                            sx={{
                                textDecoration: "none",
                                height: 120,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f5f5f5",
                                transition: "0.3s", // Smooth transition
                                "&:hover": {
                                    backgroundColor: "#e0e0e0", // Light gray on hover
                                    transform: "scale(1.05)", // Slightly increase size
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow effect
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" align="center">
                                    {item.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                ))}
            </Grid>

            {/* Featured Ads */}
            <Typography variant="h5" gutterBottom>
                Featured Ads
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {ads.slice(0, 6).map((ad) => (
                        <Grid item xs={12} sm={6} md={4} key={ad._id}>
                            <Card>
                                <CardMedia component="img" height="150" image={ad.image || "/placeholder.jpg"} alt={ad.title} />
                                <CardContent>
                                    <Typography variant="h6">{ad.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">{ad.description.substring(0, 50)}...</Typography>
                                    <Button component={Link} to={`/ads/${ad._id}`} size="small" sx={{ mt: 1 }}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};