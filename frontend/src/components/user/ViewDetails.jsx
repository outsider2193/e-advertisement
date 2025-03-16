import { Typography, Box, Button, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from "../../api/axios";


export const ViewDetails = () => {
    const { id } = useParams();
    const [ad, setAd] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleBooking = () => {
        navigate(`/bookings/${id}`);
    }

    useEffect(() => {
        fetchAdDetails();
    }, [id]);

    const fetchAdDetails = async () => {
        setLoading(true);
        try {
            const res = await API.get(`/ad/${id}`);
            console.log("API Response:", res.data);
            setAd(res.data);
        } catch (error) {
            console.log("Error fetching ad details:", error);
        } finally {
            setLoading(false);
        }
    };
    

    if (loading)
        return <Typography>Loading...</Typography>;
    if (!ad)
        return <Typography>No ad details found.</Typography>;
    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <Card sx={{ boxShadow: 3, padding: "20px", borderRadius: "10px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 2 }}>
                    {ad.title}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                    <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
                    />
                </Box>
                <CardContent>
                    <Typography variant="body1"><strong>Location:</strong> {ad.cityId?.name || "N/A"}, {ad.areaId?.name || "N/A"}</Typography>
                    <Typography variant="body1"><strong>Description:</strong> {ad.description}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 2 }}>Price: ₹{ad.budget}</Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleBooking}>Book Now</Button>
                </CardContent>
            </Card>
        </Box>
    )
}
