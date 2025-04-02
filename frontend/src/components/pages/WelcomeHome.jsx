import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import homeimg from "../assets/images/WelcomeHome1.jpg";

export const WelcomeHome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/specificregister");
  };

  return (
    <>
      <Navbar />
      {/* Full Page Centered Box */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: `url(${homeimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          color: "black",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to AdVerse
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 600 }}>
          Discover and advertise your products effectively with our platform.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1.2rem", backgroundColor: "#1976d2", borderRadius: "30px" }}
          onClick={handleStart}
        >
          Get Started
        </Button>
      </Box>
    </>
  );
};

