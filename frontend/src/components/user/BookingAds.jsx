import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/axios";
import BookMyAd from "../../assets/BookMyAd.jpg"; // update path if needed

export const BookingAds = () => {
    const { register, handleSubmit } = useForm();
    const { id: adId } = useParams();
    const navigate = useNavigate();

    const [adDetails, setAdDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [bookingData, setBookingData] = useState(null);
    const [processingPayment, setProcessingPayment] = useState(false);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const res = await API.get(`/ad/${adId}`);
                setAdDetails(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch ad details:", error);
                toast.error("Failed to load advertisement details");
                setLoading(false);
            }
        };

        fetchAdDetails();
    }, [adId]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const initiatePayment = async (formData) => {
        try {
            setProcessingPayment(true);
            const amount = 100;

            const orderResponse = await API.post("/createorder", {
                amount: amount,
                currency: "INR",
                receipt: `receipt_order_${Date.now()}`
            });

            const orderData = orderResponse.data.order || orderResponse.data;

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                setProcessingPayment(false);
                toast.error("Failed to load payment gateway.");
                return;
            }

            setBookingData({
                ...formData,
                amount: amount,
                currency: "INR"
            });

            const options = {
                key: "rzp_test_QHSpqK630bLb7U",
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Ad Booking",
                description: `Booking for ${adDetails?.title || "Ad"}`,
                order_id: orderData.id,
                handler: async function (response) {
                    handlePaymentSuccess(response, orderData);
                },
                prefill: {
                    name: formData.contactPerson || "Customer",
                    email: localStorage.getItem("email") || ""
                },
                theme: {
                    color: "#3f51b5"
                },
                modal: {
                    ondismiss: function () {
                        setProcessingPayment(false);
                        toast.info("Payment cancelled.");
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            setProcessingPayment(false);
            console.error("Payment initiation failed:", error);
            toast.error("Failed to initiate payment.");
        }
    };

    const handlePaymentSuccess = async (paymentResponse, orderData) => {
        try {
            const verificationResponse = await API.post("/verifyorder", {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature
            });

            if (verificationResponse.data.status === "success") {
                await submitBooking(paymentResponse, orderData);
            } else {
                setProcessingPayment(false);
                toast.error("Payment verification failed.");
            }
        } catch (error) {
            setProcessingPayment(false);
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed.");
        }
    };

    const submitBooking = async (paymentDetails, orderData) => {
        if (!bookingData) {
            setProcessingPayment(false);
            toast.error("Booking data not found.");
            return;
        }

        try {
            const finalBookingData = {
                startTime: bookingData.startTime,
                endTime: bookingData.endTime,
                displayFrequency: bookingData.displayFrequency || "standard",
                specialPlacement: bookingData.specialPlacement || "",
                contactPerson: bookingData.contactPerson || "",
                specialInstructions: bookingData.specialInstructions || "",
                analyticsRequired: bookingData.analyticsRequired || false,
                payment: {
                    orderId: paymentDetails.razorpay_order_id,
                    paymentId: paymentDetails.razorpay_payment_id,
                    signature: paymentDetails.razorpay_signature,
                    amount: bookingData.amount,
                    currency: bookingData.currency
                }
            };

            await API.post(`/bookads/${adId}`, finalBookingData);
            setProcessingPayment(false);
            toast.success("Booking successful! 🎉");
            setBookingData(null);
            navigate("/thankyou"); // Redirect after success
        } catch (error) {
            setProcessingPayment(false);
            console.error("Booking failed:", error);
            toast.error("Booking failed.");
        }
    };

    const validateAndProceed = (data) => {
        if (new Date(data.endTime) < new Date(data.startTime)) {
            setError("End date must be after the start date.");
            toast.error("End date must be after the start date.");
            return;
        }
        setError("");
        initiatePayment(data);
    };

    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundImage: `url(${BookMyAd})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "20px"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                padding: "24px",
                borderRadius: "12px",
                width: "100%",
                maxWidth: "500px",
                background: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
            }}>
                <Typography variant="h5" gutterBottom>
                    Book Your Ad
                </Typography>
                <form onSubmit={handleSubmit(validateAndProceed)}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Start Time"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        {...register("startTime", { required: true })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="End Time"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        {...register("endTime", { required: true })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contact Person"
                        {...register("contactPerson")}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Special Instructions"
                        {...register("specialInstructions")}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register("analyticsRequired")} />}
                        label="Require Analytics"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processingPayment}
                    >
                        {processingPayment ? "Processing..." : "Proceed to Payment"}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
