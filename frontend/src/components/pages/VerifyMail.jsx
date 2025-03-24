import React, { useEffect, useState } from 'react'
import { Typography, Box, CircularProgress } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api/axios';

export const VerifyMail = () => {
    const [verifying, setVerifying] = useState(true);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Make sure this endpoint matches your backend route
                const res = await API.get(`/auth/verifymail/${token}`);
                toast.success("Email successfully verified!");
                setTimeout(() => navigate("/login"), 2000);
            } catch (error) {
                console.error("Verification error:", error);
                const errorMessage = error.response?.data?.message || "Invalid or expired verification link.";
                toast.error(errorMessage);
                setTimeout(() => navigate("/login"), 3000);
            } finally {
                setVerifying(false);
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: 3
        }}>
            {verifying ? (
                <>
                    <CircularProgress size={60} sx={{ mb: 3 }} />
                    <Typography variant="h5">Verifying your email...</Typography>
                </>
            ) : (
                <Typography variant="h5">Welcome to AdVerse, redirecting to login page...</Typography>
            )}
        </Box>
    )
}