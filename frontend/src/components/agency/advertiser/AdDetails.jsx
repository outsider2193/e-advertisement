import React, { useState } from 'react';
import { Box, Container, TextField, Typography, Button, CssBaseline, Select, Input,FormHelperText} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Form, useForm } from 'react-hook-form';
import API from '../../../api/axios';
import { toast } from 'react-toastify';

export const AdDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
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

    const validations = {
        titleValidation: {
            required: {
                value: true,
                message: "title is required"

            },
            minLength: {
                value: 3,
                message: "Title should contain enough characters"
            }
        },
        descriptionValidation: {
            required: {
                value: true,
                message: "Description is required"

            },
            minLength: {
                value: 10,
                message: "Should contain aleast 10 characters"
            }
        },
        targetValidation: {
            required: {
                value: true,
                message: " This Field  is required"

            }
        },
        cityValidation: {
            required: {
                value: true,
                message: "Field is required"

            }
        },
        adTypeValidation: {
            required: {
                value: true,
                message: "Field is required"

            }
        },
        adDurationValidation: {
            required: {
                value: true,
                message: "Duration is required"
            }
        },
        budgetValidation: {
            required: {
                value: true,
                message: "Budget is required"

            }
        },



    }

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
                        height: "600px", // Fixed height
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
                            <TextField fullWidth label="Title"
                                {...register("title", validations.titleValidation)}
                                error={!!errors.Title}
                                helperText={errors.Title?.message}
                                variant="outlined" sx={inputStyles} />

                            <TextField fullWidth multiline rows={2} label="Description"
                                {...register("description", validations.descriptionValidation)}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                variant="outlined" sx={inputStyles} />

                            <TextField fullWidth label="Target Audience"
                                {...register("targetAudience", validations.targetValidation)}
                                error={!!errors.targetAudience}
                                helperText={errors.targetAudience?.message}
                                variant="outlined" sx={inputStyles} />


                            <TextField fullWidth label="State"
                                {...register("state", validations.cityValidation)}
                                error={!!errors.state}
                                helperText={errors.state?.message}
                                variant="outlined" sx={inputStyles} />

                            <TextField fullWidth label="City"
                                {...register("city", validations.cityValidation)}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                                variant="outlined" sx={inputStyles} />

                            <TextField fullWidth label="Location"
                                {...register("location", validations.cityValidation)}
                                error={!!errors.location}
                                helperText={errors.loction?.message}
                                variant="outlined" sx={inputStyles} />

                            <Button type="submit" variant="contained" fullWidth sx={{
                                background: "#2563EB", fontWeight: "bold", fontSize: "1rem", mt: 2,
                            }}>
                                {loading ? "Posting..." : "Submit Advertisement"}
                            </Button>
                        </form>
                    </Box>


                    <Box sx={{
                        flex: 1,
                        padding: "20px",
                        borderLeft: "2px solid rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>More Options</Typography>

                        <FormControl fullWidth error={!!errors.adType}>
                            <InputLabel>adType</InputLabel>
                            <Select
                                label="adType"
                                {...register("adType", validations.adTypeValidation)}
                                defaultValue=""

                                sx={inputStyles}
                            >
                                <MenuItem value="Hoarding">Hoarding</MenuItem>
                                <MenuItem value="Digital">Digital</MenuItem>
                            </Select>
                            {errors.adType && <FormHelperText>{errors.adType.message}</FormHelperText>}
                        </FormControl>


                        <TextField fullWidth label="Ad Duration (Days)"
                            {...register("adDuration", validations.adDurationValidation)}
                            error={!!errors.adDuration}
                            helperText={errors.adDuration?.message}
                            variant="outlined" sx={inputStyles} />

                        <TextField fullWidth label="Budget ($)"
                            {...register("budget", validations.budgetValidation)}
                            error={!!errors.budget}
                            helperText={errors.budget?.message}
                            variant="outlined" sx={inputStyles} />
                    </Box>
                </Box>
            </Container>
        </>
    );
};


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
