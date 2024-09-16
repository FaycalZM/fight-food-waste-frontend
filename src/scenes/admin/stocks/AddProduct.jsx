import { useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography, Avatar, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import { Link, useParams } from "react-router-dom";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";

const AddProductToStock = () => {
    const theme = useTheme(); // Use the provided theme
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        product_name: "",
        barcode: "",
        category: "",
        expiration_date: "",
        user_id: "",
        stock_id: ""
    });
    // get stock id from url
    const { id } = useParams();
    const {
        merchants,
        stocks,
        setProducts
    } = useContext(DataContext);

    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${apiUrl}/admin/add_product`, formData)
            .then((res) => {
                setResponse(res.data.message);
                setError("");
                setProducts([...products, res.data.product]);
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
                    Add Product To Stock
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                {response && (
                    <Typography variant="body2" color="success" align="center" sx={{ mb: 2 }}>
                        {response}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                    />
                    <TextField
                        label="Barcode"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                    />
                    <TextField
                        label="Expiration Date"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="date"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            }
                        }}
                    />
                    {/* Merchants dropdown */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="merchant-label">Merchant</InputLabel>
                        <Select
                            labelId="merchant-label"
                            id="user_id"
                            name="user_id"
                            value={formData.user_id}
                            label="Merchant"
                            onChange={handleChange}
                        >
                            {merchants.active.map((merchant) => (
                                <MenuItem key={merchant.id} value={merchant.id}>
                                    {merchant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Stocks dropdown */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="stock-label">Stock</InputLabel>
                        <Select
                            labelId="stock-label"
                            id="stock_id"
                            name="stock_id"
                            value={formData.stock_id}
                            label="Stock"
                            onChange={handleChange}
                        >
                            {stocks.map((stock) => (
                                <MenuItem key={stock.id} value={stock.id}>
                                    {`${stock.warehouse_location} - ${stock.id}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Add Product
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default AddProductToStock;
