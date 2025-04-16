import React, { useState ,useEffect} from "react";
import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Divider,
    Grid,
    Paper
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/axios";
import BookMyAd from "../assets/images/BookMyAd.jpg";

export const BookingAds = () => {
    const { register, handleSubmit, watch, setValue } = useForm();
    const adId = useParams().id;
    const [adDetails, setAdDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

   
    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const res = await API.get(`/ad/${adId}`);
                setAdDetails(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch ad details:", error);
                toast.error("Failed to load advertisement details");
                setLoading(false);
            }
        };

        fetchAdDetails();
    }, [adId]);

    const postBooking = async (data) => {
        if (new Date(data.endTime) < new Date(data.startTime)) {
            setError("End date must be after the start date.");
            toast.error("End date must be after the start date.");
            return;
        }
        setError("");

        try {
        
            const bookingData = {
                startTime: data.startTime,
                endTime: data.endTime,
                displayFrequency: data.displayFrequency || "standard",
                specialPlacement: data.specialPlacement || "",
                contactPerson: data.contactPerson || "",
                specialInstructions: data.specialInstructions || "",
                analyticsRequired: data.analyticsRequired || false
            };

            const res = await API.post(`/bookads/${adId}`, bookingData);
            toast.success("Booking successful! 🎉");
            console.log("Booking successful:", res.data);
        } catch (error) {
            console.error("Booking failed:", error);
            toast.error("Booking failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <Container>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
                    <Typography>Loading advertisement details...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                {adDetails && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                            {adDetails.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {adDetails.description}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2">
                                    <strong>Type:</strong> {adDetails?.adType}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Dimensions:</strong> {adDetails?.adDimensions || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2">
                                    <strong>Duration:</strong> {adDetails.adDuration}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Budget:</strong> ${adDetails.budget}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Paper>

            <Paper elevation={3}>
                <Box sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
                        BOOK ADVERTISEMENT
                    </Typography>

                    <form onSubmit={handleSubmit(postBooking)} style={{ width: "100%" }}>
                        <Grid container spacing={3}>
                            {/* Required Booking Fields */}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mb: 1 }}>Required Information</Typography>
                                <Divider sx={{ mb: 2 }} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="date"
                                    label="Start Date"
                                    InputLabelProps={{ shrink: true }}
                                    {...register("startTime")}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="date"
                                    label="End Date"
                                    InputLabelProps={{ shrink: true }}
                                    {...register("endTime")}
                                    required
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>

                            {/* Optional Booking Fields */}
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Additional Options</Typography>
                                <Divider sx={{ mb: 2 }} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Display Frequency</InputLabel>
                                    <Select
                                        label="Display Frequency"
                                        defaultValue="standard"
                                        {...register("displayFrequency")}
                                    >
                                        <MenuItem value="low">Low (1-3 times daily)</MenuItem>
                                        <MenuItem value="standard">Standard (4-8 times daily)</MenuItem>
                                        <MenuItem value="high">High (9-15 times daily)</MenuItem>
                                        <MenuItem value="premium">Premium (16+ times daily)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Special Placement Requests"
                                    placeholder="E.g., Top of page, Near related content"
                                    {...register("specialPlacement")}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Contact Person for Ad Communications"
                                    placeholder="Name and contact information"
                                    {...register("contactPerson")}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...register("analyticsRequired")}
                                        />
                                    }
                                    label="Receive performance analytics for this ad campaign"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Special Instructions"
                                    placeholder="Any additional information about your booking"
                                    {...register("specialInstructions")}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                />
                            </Grid>

                            {error && (
                                <Grid item xs={12}>
                                    <Typography color="error" sx={{ textAlign: "center" }}>
                                        {error}
                                    </Typography>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ minWidth: 200 }}
                                    >
                                        Submit Booking
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};
