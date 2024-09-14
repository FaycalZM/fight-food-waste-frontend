import React, { useState } from "react";
import { Box, Button, TextField, Typography, Avatar, useTheme } from "@mui/material";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Link } from "react-router-dom";

const MerchantLogin = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
    };

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
                    Merchant Login
                </Typography>
                <form onSubmit={handleSubmit}>

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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Sign in
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
                            You don't have an account?
                        </Typography>
                        <Link
                            to={"/merchant/signup"}
                            style={{ textDecoration: "underline", color: theme.palette.secondary, fontWeight: "bold" }}
                        >
                            Signup
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default MerchantLogin;
