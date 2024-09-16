import { useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography, Avatar, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import { Link } from "react-router-dom";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";

const AddStock = () => {
    const theme = useTheme(); // Use the provided theme
    const [formData, setFormData] = useState({
        warehouse_location: "",
    });

    const { stocks, setStocks } = useContext(DataContext);
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${apiUrl}/admin/add_stock`, formData)
            .then((res) => {
                setStocks([...stocks, res.data.stock]);
                setResponse(res.data.message);
                setError("");
            }).catch((error) => {
                setError(error.response.data.message);
                setResponse("");
            })
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
                    <WarehouseOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" align="center" gutterBottom>
                    Add New Stock
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
                        label="Warehouse Location"
                        name="warehouse_location"
                        value={formData.warehouse_location}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Add Stock
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default AddStock;
