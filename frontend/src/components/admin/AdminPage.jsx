import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link, Outlet } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { toast, Bounce } from "react-toastify";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

export const AdminPage = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        checkId()
    }, [id])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
    }

    const handleClickonMenu = (detail) => {
        if (detail === "View all ads") {
            navigate("viewallads")
        }
        if (detail === "View all the users") {
            navigate("viewallusers")
        }
        if (detail === "View all the bookings") {
            navigate("viewallbookings")
        }
    }

    const checkId = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            toast.error("No user data found");
        }
        try {
            const decoded = jwtDecode(token);
            const adminId = decoded.id;
            const role = decoded.role;
            if ((adminId) !== id || role !== "admin") {
                navigate("/login");
                toast.error("Invalid id or data");
            }

        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }

    const details = ["View all ads", "View all the users", "View all the bookings"];
    const userDetails = ["Account", "Sign out "]

    return (
        <>
            <AppBar position='static' sx={{ bgcolor: "silver" }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Typography
                            variant='h4'
                            component={Link}
                            to="/"

                            sx={{
                                mr: 2,
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                textDecoration: "none"
                            }}
                        >
                            AdVerse
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {details.map((detail) => (
                                <Button
                                    onClick={() => { handleClickonMenu(detail) }}
                                    key={detail}
                                    sx={{ my: 2, color: 'black', display: 'block', ml: 5 }}
                                >
                                    {detail}
                                </Button>
                            ))}
                        </Box>
                        <Box
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="black"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {details.map((detail) => (
                                    <MenuItem key={detail}
                                        onClick={() => { handleClickonMenu(detail) }}
                                    >
                                        <Typography sx={{ textAlign: 'center' }}>{detail}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} >
                                    <Avatar
                                        sx={{
                                            bgcolor: "blue",
                                            height: "35px",
                                            width: "35px"
                                        }}
                                        alt="User Profile" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {userDetails.map((user) => (
                                    <MenuItem key={user} onClick={handleCloseUserMenu}>
                                        {user}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>


                    </Toolbar>

                </Container>
            </AppBar >

            <Outlet />
        </>
    )
}
