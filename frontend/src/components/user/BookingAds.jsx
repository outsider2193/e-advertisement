import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Box, TextField, Typography } from "@mui/material";

export const BookingAds = () => {
    const [value, setValue] = useState([dayjs(), dayjs().add(7, "day")]);

    return (

        <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px", fontWeight: "bold", textAlign: "center" }}>
                Book Ads
            </Typography>


            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh",width:"80vw", border:"1px solid ", borderRadius: "8px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(start, end) => (
                            <>
                                <TextField {...start} label="Start Date" />
                                <TextField {...end} label="End Date" sx={{ ml: 2 }} />
                            </>
                        )}
                    />
                </LocalizationProvider>
            </Box>
        </Box>
    );
};
