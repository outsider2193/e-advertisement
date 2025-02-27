import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, CssBaseline } from '@mui/material';
import { useForm } from 'react-hook-form';
import API from '../../../api/axios';
import { toast } from 'react-toastify';

export const AdDetails = () => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const handlerSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await API.post("/advertiser/createads", data);
            console.log(res);
            console.log(data);
            toast.success("Ad details created successfully!");
        } catch (error) {
            toast.error("Error submitting ad", error);
        }
        setLoading(false);
    };

    return (
        <>
            <CssBaseline />
            
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    height: "100vh", // Full viewport height
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#0A192F",
                    padding: "0px", // Removes extra spacing
                    position: "relative",
                }}
            >
                {/* Main Box Container */}
                <Box
                    sx={{
                        display: "flex",
                        width: "80%",
                        maxWidth: "1200px",
                        height: "500px", // Fixed height
                        backgroundColor: "#112240",
                        borderRadius: "8px",
                        boxShadow: "4px 4px 10px rgba(0,0,0,0.3)",
                        color: "white",
                        padding: "20px",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)", // Centers properly
                    }}
                >
                    {/* Left - Form Section */}
                    <Box sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "20px",
                    }}>
                        <Typography variant="h4" sx={{
                            fontWeight: "bold", mb: 2, textTransform: "uppercase", textAlign: "center",
                        }}>
                            Advertisement Details
                        </Typography>

                        <form onSubmit={handleSubmit(handlerSubmit)}>
                            <TextField fullWidth label="Title" {...register("title")} variant="outlined" sx={inputStyles} />
                            <TextField fullWidth multiline rows={2} label="Description" {...register("description")} variant="outlined" sx={inputStyles} />
                            <TextField fullWidth label="Target Audience" {...register("targetAudience")} variant="outlined" sx={inputStyles} />
                            <TextField fullWidth label="City" {...register("city")} variant="outlined" sx={inputStyles} />

                            <Button type="submit" variant="contained" fullWidth sx={{
                                background: "#2563EB", fontWeight: "bold", fontSize: "1rem", mt: 2,
                            }}>
                                {loading ? "Posting..." : "Submit Advertisement"}
                            </Button>
                        </form>
                    </Box>

                    {/* Right - Additional Options */}
                    <Box sx={{
                        flex: 1,
                        padding: "20px",
                        borderLeft: "2px solid rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>More Options</Typography>
                        <TextField fullWidth label="Ad Type" {...register("adType")} variant="outlined" sx={inputStyles} />
                        <TextField fullWidth label="Ad Duration (Days)" {...register("adDuration")} variant="outlined" sx={inputStyles} />
                        <TextField fullWidth label="Budget ($)" {...register("budget")} variant="outlined" sx={inputStyles} />
                    </Box>
                </Box>
            </Container>
        </>
    );
};

// Common Input Styling
const inputStyles = {
    mb: 2,
    '& .MuiInputBase-input': { color: "white" },
    '& .MuiInputLabel-root': { color: "white" },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: "white" },
        '&:hover fieldset': { borderColor: "#2563EB" },
    },
};

export default AdDetails;
