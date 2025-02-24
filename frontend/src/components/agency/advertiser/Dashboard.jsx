import React, { useState } from 'react'
import { Box, Container, TextField, Typography, Button, CssBaseline } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import API from '../../../api/axios';
import { toast } from 'react-toastify';
export const Dashboard = () => {

    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const handlerSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await API.post("/advertiser/createads", data);
            console.log(res);
            console.log(data);
            toast.success("Ad details created succesfully!");
        } catch (error) {
            toast.error("Error submitting ad", error)
        }
        setLoading(false);
    }
    return (
        <>
            <CssBaseline />
            <div style={{ paddingTop: "1px", textAlign: "center" }}> {/* Pushes content down */}
                <h1>Advertiser Dashboard</h1>
            </div>
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    minHeight: "90vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0A192F",
                }}

            >



                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 500,
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 4,
                        textAlign: "center",
                        bgcolor: "#112240",
                        color: "white",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            mb: 3,
                            textTransform: "uppercase",
                            color: "white",
                        }}
                    >
                        Advertisement Details
                    </Typography>
                    <form onSubmit={handleSubmit(handlerSubmit)}>
                        <TextField
                            fullWidth
                            label="Title"
                            {...register("title")}
                            variant="outlined"
                            sx={{
                                mb: 2,
                                "& label": { color: "#A8B2D1" }, // Light bluish label
                                "& input": { color: "white" },
                                "& fieldset": { borderColor: "#233554" }, // Muted blue border
                                "&:hover fieldset": { borderColor: "#64ffda" }, // Teal hover
                            }}

                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            {...register("description")}
                            variant="outlined"
                            sx={{
                                mb: 2,
                                "& label": { color: "#A8B2D1" },
                                "& input, & textarea": { color: "white" }, // Apply to both input and textarea
                                "& fieldset": { borderColor: "#233554" },
                                "&:hover fieldset": { borderColor: "#64ffda" },
                            }}

                        />


                        <TextField
                            fullWidth
                            label="Target Audience"
                            variant="outlined"
                            sx={{
                                mb: 2,
                                "& label": { color: "#A8B2D1" },
                                "& input": { color: "white" },
                                "& fieldset": { borderColor: "#233554" },
                                "&:hover fieldset": { borderColor: "#64ffda" },
                            }}
                            {...register("targetAudience")}
                        />

                        <TextField
                            fullWidth
                            label="Budget ($)"
                            variant="outlined"
                            sx={{
                                mb: 3,
                                "& label": { color: "#A8B2D1" },
                                "& input": { color: "white" },
                                "& fieldset": { borderColor: "#233554" },
                                "&:hover fieldset": { borderColor: "#64ffda" },
                            }}
                            {...register("budget")}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                background: "linear-gradient(to right, #2563EB, #17375E)", // Dark blue gradient
                                fontWeight: "bold",
                                fontSize: "1rem",
                                "&:hover": {
                                    background: "#0A74DA",
                                },
                            }}
                        >
                            {/* Submit Advertisement */}
                            {loading ? "Posting...." : "Submit Advertisement"}
                        </Button>
                    </form>
                </Box>
            </Container>
        </>


    )
}
