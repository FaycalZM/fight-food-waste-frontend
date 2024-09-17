import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Avatar, useTheme } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "@/base";

const AdminLogin = ({ onLogin }) => {
    const theme = useTheme(); // Use the provided theme
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();


    // check if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role === "admin") {
            onLogin();
            navigate("/admin/dashboard");
        }
    }, [navigate, onLogin]);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${apiUrl}/admin/login`, credentials)
            .then((response) => {
                const { admin, token } = response.data;
                localStorage.setItem("id", admin.id);
                localStorage.setItem("name", admin.name);
                localStorage.setItem("email", admin.email);
                localStorage.setItem("token", token);
                localStorage.setItem("role", "admin");

                onLogin(); // Call parent function to log in as admin
                navigate("/admin/dashboard");

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
                    boxShadow: theme.shadows[3],
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
                    <AdminPanelSettingsOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2 }}>
                    Admin Login
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default AdminLogin;
