import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography, Avatar, Collapse } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import API from "../../api/axios";

const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expand",
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

export const Screens = () => {




  const [ads, setAds] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await API.get("/ads");
        console.log(res);
        console.log(res.data);
        setAds(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAds();
  }, []);

  const handleExpand = (_id) => {
    setExpanded((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
  };


  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        justifyItems: "center",
        alignItems: "start",
        padding: "20px",
      }}
    >
      {ads.map((ad) => (
        <Card key={ad._id} sx={{ width: "100%", maxWidth: 300, minHeight: "150px" }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: "red" }}>{ad.title[0]}</Avatar>}
            title={ad.title}
            subheader={ad.cityId?.name}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {ad.description}
            </Typography>
          </CardContent>
          <CardActions>
            <ExpandMore
              onClick={() => handleExpand(ad._id)}
              sx={{ transform: expanded[ad._id] ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded[ad._id]} timeout="auto" unmountOnExit sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="body2">Ad Type: {ad.adType}</Typography>
              <Typography variant="body2">Target Audience: {ad.targetAudience}</Typography>
              {ad.adDuration && <Typography variant="body2">Duration: {ad.adDuration} days</Typography>}
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}

export default Screens;
