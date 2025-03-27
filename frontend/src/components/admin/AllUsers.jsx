import React, { useEffect, useState } from 'react'
import API from '../../api/axios'
import { useParams } from "react-router-dom"
import { Container, Card, CardHeader, CardContent, IconButton, Typography, Avatar, MenuItem, Select, FormControl, InputLabel, Box, CardMedia, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, FormHelperText } from "@mui/material";
export const AllUsers = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    // const { role } = useParams();


    const getUsers = async () => {
        try {
            const res = await API.get(`/admin/allusers`)
            console.log(res.data.data);
            // console.log("all users", res.data.data[3].role);
            setUsers(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const usersByParticularRole = async (role) => {
        const res = await API.get(`/admin/usersbyrole/${role}`)
        setUsers(res.data.data);
        // setRole(role);
    }

    return (
        <Box  >
            <Box
                mt={"30px"}
                ml={"50%"}
                mb={"35px"}
            >
                <Button
                    variant='contained'
                    sx={{ borderRadius: "20px" }}
                    onClick={() => { usersByParticularRole("advertiser") }}
                >Advertisers </Button>
                <Button
                    variant='contained'
                    sx={{ borderRadius: "20px" }}
                    onClick={() => { usersByParticularRole("viewer") }}
                >
                    Viewer

                </Button>
                <Button
                    variant='contained'
                    sx={{ borderRadius: "20px" }}
                    onClick={() => { getUsers() }}
                >
                    All users

                </Button>
            </Box>
            {users?.map((user, index) => (
                <Card key={index} sx={{ marginBottom: 2, padding: 2, width: "60%" }}>
                    <CardContent>
                        <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
                        <Typography variant="body1">Email: {user.email}</Typography>
                        <Typography variant="body2">Role: {user.role}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box >

    )
}
