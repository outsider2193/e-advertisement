import { Box, Container, Typography, Avatar, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import API from "../../../api/axios";
import { jwtDecode } from "jwt-decode";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const UserInfo = () => {

    const token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const [user, setUser] = useState({ data: {} });
    const [isEdit, setIsEdit] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        fetchUserById();
    }, [])

    useEffect(() => {
        if (user && user.data) {
            setValue("firstName", user.data.firstName || "");
            setValue("lastName", user.data.lastName || "");
            setValue("email", user.data.email || "");
        }
    }, [user, setValue]);

    const fetchUserById = async () => {
        try {
            const res = await API.get(`/auth/user/${userId}`);
            console.log(res.data.data);
            const userData = res.data;
            setUser(userData);
        } catch (error) {
            console.log(error);
        }



    }
    const submitHandler = async (data) => {
        try {
            const res = await API.put(`/auth/userupdateprofile/${userId}`, data)
            console.log(res.data);
            toast.success("Details successfully updated!")
            fetchUserById();

        } catch (error) {
            console.log(error);
            toast.error("Error updating details");
        }

    }

    const handleClick = () => {
        setIsEdit(true);
    }

    return (
        <Container sx={{ 
            bgcolor: "#EFD7CF",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100vw", 
            minHeight: "100vh",
            padding: 0,
            margin: 0, 
            }}
            >
            <Box //start of parent box
                sx={{ mt: 9, ml: 1 }}
                width="80vw"
            >
                <Box borderBottom="1px solid" >
                    <Typography variant='h4' fontWeight="bold"> User Personal Info</Typography>
                </Box>

                <Box
                    sx={{ mt: 10, ml: 10 }}
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                >

                    <Avatar sx={{
                        bgcolor: deepOrange[500],
                        height: "100px",
                        width: "100px",
                        fontWeight: "bold",
                        fontSize: "35px"
                    }}>{user.data?.firstName ? user.data.firstName[0] : ""}</Avatar>

                    <Box display="flex" flexDirection="column" sx={{ ml: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            {user.data?.firstName} {user.data?.lastName}
                        </Typography>

                        <Button variant='contained' sx={{ mt: 1 }} onClick={handleClick} >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 10,

                    }}
                >
                    <form onSubmit={handleSubmit(submitHandler)} >
                        <TextField
                            sx={{ ml: 6 }}
                            label="Name"
                            {...register("firstName")}
                            InputLabelProps={{ shrink: true }}
                            defaultValue={user.data?.firstName || ""}
                            variant='filled'
                            disabled={!isEdit}

                        ></TextField>

                        <TextField
                            sx={{ ml: 6 }}
                            label="lastname"
                            {...register("lastName")}
                            InputLabelProps={{ shrink: true }}
                            defaultValue={user.data?.lastName || ""}
                            variant='filled'
                            disabled={!isEdit}
                        ></TextField>

                        <TextField
                            sx={{ ml: 6 }}
                            label="email"
                            {...register("email")}
                            InputLabelProps={{ shrink: true }}
                            defaultValue={user.data?.email || ""}
                            variant='filled'
                            disabled={!isEdit}
                        ></TextField>

                        {isEdit && (
                            <Box>
                                <Button
                                    type='submit'
                                    sx={{ ml: 6, mt: 4 }}
                                    variant='contained'
                                    hidden={!isEdit}
                                >Save</Button>

                                <Button
                                    type='button'
                                    sx={{ ml: 3, mt: 4 }}
                                    variant='outlined'
                                    onClick={() => { setIsEdit(false) }}

                                >Cancel</Button>
                            </Box>
                        )}
                    </form>
                </Box>


            </Box > {/* end of parent box */}
        </Container >

    );
};

