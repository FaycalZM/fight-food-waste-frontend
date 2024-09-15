import { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from route
    const theme = useTheme(); // Use the provided theme

    // State to hold product details
    const [productDetails, setProductDetails] = useState({
        id: "",
        name: "",
        category: "",
        merchant: "",
        expirationDate: "",
    });

    // Simulate fetching product details based on ID (replace with actual API call)
    useEffect(() => {
        const fetchProductDetails = async () => {
            // Replace with real API call using `id`
            const mockData = {
                id: id,
                name: "Sample Product",
                category: "Electronics",
                merchant: "Merchant A",
                expirationDate: "2024-12-31",
            };

            setProductDetails(mockData);
        };

        fetchProductDetails();
    }, [id]);

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
                p: 3,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    p: 3,
                    borderRadius: "8px",
                    boxShadow: theme.shadows[3],
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Product Details (ID: {productDetails.id})
                </Typography>

                <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
                    <List>
                        <ListItem>
                            <ListItemText primary="Product Name" secondary={productDetails.name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Category" secondary={productDetails.category} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Merchant (Owner)" secondary={productDetails.merchant} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Expiration Date" secondary={productDetails.expirationDate} />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        </Box>
    );
};

export default ProductDetails;
