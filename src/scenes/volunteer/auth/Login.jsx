import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Avatar, useTheme } from "@mui/material";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "@/base";

const VolunteerLogin = ({ onLogin }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // check if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role === "volunteer") {
            onLogin();
            navigate("/volunteer/home");
        }
    }, [navigate, onLogin]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${apiUrl}/volunteer/login`, formData)
            .then((response) => {
                const { volunteer, token } = response.data;
                // check if merchant is approved
                localStorage.setItem("id", volunteer.id);
                localStorage.setItem("name", volunteer.name);
                localStorage.setItem("email", volunteer.email);
                localStorage.setItem("skill_id", volunteer.skill_id);
                localStorage.setItem("token", token);
                localStorage.setItem("role", "volunteer");

                onLogin(); // Call parent function to log in as volunteer
                navigate("/volunteer/home");
            }).catch((error) => {
                setError(error.response.data.message);
            });
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
                    <VolunteerActivismOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" align="center" gutterBottom>
                    Volunteer Login
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
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
                            to={"/volunteer/signup"}
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

export default VolunteerLogin;
