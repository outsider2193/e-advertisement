import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const UserSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const menuItems = [
    { text: "Profile", icon: <AccountCircleIcon sx={{ color: "#333" }} /> },
    { text: "Bookings", icon: <EventAvailableIcon sx={{ color: "#333" }} /> },
    { text: "Logout", icon: <ExitToAppIcon sx={{ color: "#D32F2F" }} /> }
  ];

  return (
    <>
      {/* Menu Button to Open Sidebar */}
      <IconButton onClick={toggleDrawer(true)} sx={{ color: "#333", position: "absolute", top: 20, left: 20 }}>
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "#F5F5F5", color: "#333" }, 
        }}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#333" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default UserSidebar;
