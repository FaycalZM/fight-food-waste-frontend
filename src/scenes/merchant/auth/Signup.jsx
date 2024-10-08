import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Avatar, useTheme } from "@mui/material";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "@/base";

const MerchantSignup = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        contact_info: "",
        password: "",
        password_confirmation: "",
    });

    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${apiUrl}/merchant/register`, formData)
            .then((response) => {
                if (response.status === 200) {
                    setResponse("Account created successfully, Please wait until your account is approved");
                } else {
                    setError(response.data.message);
                }
            }).catch((error) => {
                setError(error.response.data.message);
            });
    };

    // check if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role === "merchant") {
            navigate("/merchant/home");
        }
    }, [navigate]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    p: 3,
                    borderRadius: "8px",
                    boxShadow: 3,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Avatar
                    sx={{
                        m: "auto",
                        bgcolor: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    <StorefrontOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" align="center" gutterBottom>
                    Merchant Sign Up
                </Typography>
                {response && (
                    <Typography variant="body2" color="success" align="center" sx={{ mb: 2 }}>
                        {response}
                    </Typography>
                )}
                {error && (
                    <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Contact Info"
                        name="contact_info"
                        value={formData.contact_info}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <TextField
                        label="Confirm Password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography
                            variant="h6"
                            align="center"
                            gutterBottom>
                            Already have an account?
                        </Typography>
                        <Link
                            to={"/merchant/login"}
                            style={{ textDecoration: "underline", color: theme.palette.secondary, fontWeight: "bold" }}
                        >
                            Login
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default MerchantSignup;
