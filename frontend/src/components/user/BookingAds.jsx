import React, { useState } from "react";
import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/axios";
import BookMyAd from "../assets/images/BookMyAd.jpg";

export const BookingAds = () => {
    const { register, handleSubmit } = useForm();
    const adId = useParams().id;

    const [error, setError] = useState("");

    const postBooking = async (data) => {

        if (new Date(data.endTime) < new Date(data.startTime)) {
            setError("End date must be after the start date.");
            toast.error("End date must be after the start date.");
            return;
        }
        setError("");

        try {
            const res = await API.post(`/bookads/${adId}`, {
                startTime: data.startTime,
                endTime: data.endTime,
            });
            toast.success("Booking successful! 🎉");
            console.log("Booking successful:", res.data);
        } catch (error) {
            console.error("Booking failed:", error);
            toast.error("Booking failed. Please try again.");
        }
    };

    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100vw",
            backgroundImage: `url(${BookMyAd})`, 
            height: "100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "20px"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                borderRadius: "12px",
                width: "40%",
                minWidth: "320px",
                maxWidth: "500px",
                maxHeight: "80vh",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                background: "rgba(255, 255, 255, 0.9)"
            }}>
                <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
                    BOOK ADS
                </Typography>
                <form onSubmit={handleSubmit(postBooking)} style={{ width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {/* Start Date */}
                        <TextField
                            type="date"
                            label="Start Date"
                            InputLabelProps={{ shrink: true }}
                            {...register("startTime")}
                            required
                            fullWidth
                            variant="outlined"
                        />
                        {/* End Date */}
                        <TextField
                            type="date"
                            label="End Date"
                            InputLabelProps={{ shrink: true }}
                            {...register("endTime")}
                            required
                            fullWidth
                            variant="outlined"
                        />

                        {error && (
                            <Typography color="error" sx={{ textAlign: "center" }}>
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" fullWidth>
                            Submit Booking
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};
