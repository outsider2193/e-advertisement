import { Card, CardHeader, CardContent, Typography, Avatar, Box, CardMedia, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import API from "../../api/axios"




export const AllAds = () => {
    const [ads, setAds] = useState([]);
    const [selectedAd, setSelectedAd] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);

    useEffect(() => {
        fetchAllAds();
    }, [])

    const handleViewOpen = (adId) => {
        if (!viewOpen) {
            const adToView = ads.find(ad => ad._id === adId);
            setSelectedAd(adToView);
            setViewOpen(true);
        }
    };
    const handleViewCLose = () => {
        setViewOpen(false);
        // reset();
    }

    const removeAds = async (adId) => {
        try {
            await API.delete(`/admin/deleteads/${adId}`);
            setAds(ads.filter(ad => ad._id !== adId))
            handleViewCLose();

        } catch (error) {
            console.log(error);
        }
    }


    const fetchAllAds = async () => {
        try {
            const res = await API.get("/ads");
            console.log(res.data);
            setAds(res.data);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            gap: "20px",
            padding: "20px",
        }}>
            {ads && ads?.length > 0 ? (
                ads.map((ad) => (
                    <div key={ad._id} style={{ display: "inline-block" }}>
                        <Card
                            sx={{
                                width: 330,
                                minHeight: "150px",
                                backgroundColor: "#fff",
                                color: "#000",
                                borderRadius: "12px",
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": { transform: "scale(1.05)", boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)" },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleViewOpen(ad._id);
                            }}
                        >
                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: "red" }}>{ad.title[0]}</Avatar>}
                                title={ad.title}
                                subheader={` ${ad.cityId?.name || "Cityname not available"}, ${ad.areaId?.name || "Areaname not available"}`}
                            />
                            <CardMedia
                                component="img"
                                height="300"
                                image={ad.adUrl}
                                alt={ad.title}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {ad.description}
                                </Typography>
                                <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                                    <strong>Advertiser:</strong> {ad.advertiserId?.firstName || "N/A"} {ad.advertiserId?.lastName || "N/A"}
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    <strong>Email:</strong> {ad.advertiserId?.email || "N/A"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))
            ) : (
                <Typography sx={{ mt: 2, color: "gray", width: "100%", textAlign: "center" }}>No Screens available</Typography>
            )}



            <Dialog
                open={viewOpen}
                onClose={handleViewCLose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}>
                    {selectedAd?.title}
                </DialogTitle>

                <DialogContent dividers sx={{ p: 3 }}>
                    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>

                        <Box flex="0 0 45%" display="flex" justifyContent="center">
                            <CardMedia
                                component="img"
                                image={selectedAd?.adUrl}
                                alt={selectedAd?.title}
                                sx={{ width: "100%", maxHeight: 350, objectFit: "cover", borderRadius: "12px", boxShadow: 3 }}
                            />
                        </Box>

                        <Box flex="1" display="flex" flexDirection="column" gap={2}>
                            {[
                                { label: "City", value: selectedAd?.cityId?.name },
                                { label: "Area", value: selectedAd?.areaId?.name },
                                { label: "Ad Type", value: selectedAd?.adType, color: "green" },
                                { label: "Target Audience", value: selectedAd?.targetAudience, color: "blue" },
                                { label: "Duration", value: selectedAd?.adDuration ? `${selectedAd.adDuration} days` : "N/A", color: "purple" },
                                { label: "Longitude & Latitude", value: selectedAd?.longitude_latitude, color: "orange" },
                                { label: "Budget", value: `${selectedAd?.budget} Rs`, color: "red" },
                                { label: "Dimension", value: selectedAd?.adDimensions, color: "teal" },
                                { label: "Advertiser Name", value: `${selectedAd?.advertiserId?.firstName || "N/A"} ${selectedAd?.advertiserId?.lastName || ""}`, color: "black" },
                                { label: "Advertiser Email", value: selectedAd?.advertiserId?.email, color: "black" },
                            ].map((item, index) => (
                                <Typography key={index} variant="body1" sx={{ fontWeight: "bold", fontSize: "1rem", color: item.color || "inherit" }}>
                                    <strong>{item.label}:</strong> {item.value || "Not available"}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button onClick={handleViewCLose} color="primary" variant="contained" sx={{ px: 3, py: 1 }}>
                        Close
                    </Button>
                    <Button onClick={() => { removeAds(selectedAd._id) }} color="error" variant="contained" >
                        Remove ad
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}
