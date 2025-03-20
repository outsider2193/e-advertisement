import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, CircularProgress, Box } from "@mui/material";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import bgImage from "../assets/UserBackground.jpg";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        py: 2,
        mt: "auto", // Pushes the footer to the bottom dynamically
      }}
    >
      <Typography variant="body2">© {new Date().getFullYear()} AdFirm. All rights reserved.</Typography>
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 1 }}>
        {[
          { title: "About Us", link: "/about" },
          { title: "Contact Us", link: "/contact" },
          { title: "FAQs", link: "/faqs" },
          { title: "Privacy Policy", link: "/privacy" },
          { title: "Terms & Conditions", link: "/terms" },
        ].map((item, index) => (
          <Grid item key={index}>
            <Button component={Link} to={item.link} sx={{ color: "white", textTransform: "none" }}>
              {item.title}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const User = () => {
  const user = (localStorage.getItem("user")) || {};

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await API.get("/getads");
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures the footer stays at the bottom
        overflowX: "hidden", // Prevents horizontal scrolling
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          width: "100%", // Prevents horizontal overflow
          flexGrow: 1, // Allows the main content to grow and push the footer down
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: 4,
        }}
      >
        {/* Welcome Section */}
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || "User"}! 🎉
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Explore the latest ads and find what you need.
        </Typography>

        {/* Quick Access Cards */}
        <Grid container spacing={3} sx={{ my: 3, justifyContent: "center" }}>
          {[
            { title: "Browse Ads", link: "/browseads" },
            { title: "Saved Ads", link: "/saved-ads" },
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
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  },
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
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {ads.slice(0, 6).map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad._id}>
                <Card>
                  <CardMedia component="img" height="150" image={ad.image || "/placeholder.jpg"} alt={ad.title} />
                  <CardContent>
                    <Typography variant="h6">{ad.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {ad.description.substring(0, 50)}...
                    </Typography>
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

      {/* Footer */}
      <Footer />
    </Box>
  );
};
