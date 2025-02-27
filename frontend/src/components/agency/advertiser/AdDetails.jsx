import React from 'react'
import { useEffect, useState } from 'react'
import { Box, Container, TextField, Typography, Button, CssBaseline } from '@mui/material'
import { useForm } from 'react-hook-form'
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
            toast.success("Ad details created succesfully!");
        } catch (error) {
            toast.error("Error submitting ad", error)
        }
        setLoading(false);
    }
    return (
        <>
            <CssBaseline />
            <div style={{ paddingTop: "1px", textAlign: "center" }}>
                <h1 style={{ color: "white" }}>Advertiser Dashboard</h1>
            </div>
            <Container maxWidth={false} disableGutters style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0A192F" }}>
                <Box style={{ width: "100%", maxWidth: 500, padding: "16px", borderRadius: "8px", boxShadow: "4px 4px 10px rgba(0,0,0,0.3)", textAlign: "center", backgroundColor: "#112240", color: "white" }}>
                    <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "16px", textTransform: "uppercase", color: "white" }}>
                        Advertisement Details
                    </Typography>
                    <form onSubmit={handleSubmit(handlerSubmit)}>
                        <TextField 
                            fullWidth 
                            label="Title" 
                            {...register("title")} 
                            variant="outlined" 
                            style={{ marginBottom: "16px" }} 
                            InputLabelProps={{ style: { color: "white" } }} 
                            InputProps={{ style: { color: "white" } }} 
                        />
                        
                        <TextField 
                            fullWidth 
                            multiline 
                            rows={4} 
                            label="Description" 
                            {...register("description")} 
                            variant="outlined" 
                            style={{ marginBottom: "16px" }} 
                            InputLabelProps={{ style: { color: "white" } }} 
                            InputProps={{ style: { color: "white" } }} 
                        />
    
                        <TextField 
                            fullWidth 
                            label="Target Audience" 
                            {...register("targetAudience")} 
                            variant="outlined" 
                            style={{ marginBottom: "16px" }} 
                            InputLabelProps={{ style: { color: "white" } }} 
                            InputProps={{ style: { color: "white" } }} 
                        />
    
                        <TextField 
                            fullWidth 
                            label="City" 
                            {...register("city")} 
                            variant="outlined" 
                            style={{ marginBottom: "16px" }} 
                            InputLabelProps={{ style: { color: "white" } }} 
                            InputProps={{ style: { color: "white" } }} 
                        />
    
                        <TextField 
                            fullWidth 
                            label="Ad Type" 
                            {...register("adType")} 
                            variant="outlined" 
                            style={{ marginBottom: "16px" }} 
                            InputLabelProps={{ style: { color: "white" } }} 
                            InputProps={{ style: { color: "white" } }} 
                        />
    
                        <TextField 
                            fullWidth 
                            label="Ad Duration (Days)" 
                            {...register("adDuration")} 
                            variant="outlined" 
                            style={{ marginBottom: "16px" }} 
                            InputLabelProps={{ style: { color: "white" } }} 
                            InputProps={{ style: { color: "white" } }} 
                        />
    
                        <TextField 
                            fullWidth 
                            label="Budget ($)" 
                            {...register("budget")} 
                            variant="outlined" 
                            style={{ marginBottom: "24px" }} 
                            InputLabelProps={{ style: { color: "white" } }} 
                            InputProps={{ style: { color: "white" } }} 
                        />
    
                        <Button type="submit" variant="contained" fullWidth style={{ background: "#2563EB", fontWeight: "bold", fontSize: "1rem" }}>
                            {loading ? "Posting..." : "Submit Advertisement"}
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
    
    
}


