import React, { useState } from 'react'
import { Button, Container, Typography, Box, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";


import { toast } from "react-toastify";
import API from '../../api/axios';

export const Screens = () => {
  const [ads, setAds] = useState([]);
  const [openAd, setOpenAd] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleAd = (id) => {
    setOpenAd((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await API.get("/ads");
      console.log(res.data[0].advertiserId);
      setAds(res.data);
      toast.success("Ads fetched successfully!");
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast.error("Failed to fetch ads");
    }
    setLoading(false);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Screens Section
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchAds}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch Ads"}
      </Button>

      <Box sx={{ mt: 3 }}>
        {ads.length > 0 ? (
          <List>
            {ads.map((ad) => (
              <ListItem key={ad._id} sx={{ borderBottom: "1px solid #ddd", flexDirection: "column", alignItems: "stretch" }}>
                <ListItemButton onClick={() => toggleAd(ad._id)}>
                  <ListItemText primary={ad.title} />
                  {openAd[ad._id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAd[ad._id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`Description: ${ad.description}`} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={`AdType: ${ad.adType}`} />
                    </ListItemButton>
                  </List>
                </Collapse>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ mt: 2, color: "gray" }}>No ads available.</Typography>
        )}
      </Box>
    </Container >
  );
}

export default Screens;
