import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Avatar, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import { Link } from "react-router-dom";

const AddStock = () => {
    const theme = useTheme(); // Use the provided theme
    const [formData, setFormData] = useState({
        warehouse_location: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add stock creation logic here
        console.log("Created stock:", formData);
        // Redirect after successfull creation
        // navigate("/admin/stocks");
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
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Quantity"
                        name="quantity_in_stock"
                        value={formData.quantity_in_stock}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                    />
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

                    <FormControl fullWidth margin="normal">
                        <InputLabel id="skill-label">Product</InputLabel>
                        <Select
                            labelId="product-label"
                            id="product_id"
                            name="product_id"
                            value={formData.product_id}
                            label="Product"
                            onChange={handleChange}
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.name}
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
                        Add Stock
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default AddStock;
