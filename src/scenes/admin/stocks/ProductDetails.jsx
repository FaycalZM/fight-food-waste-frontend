import { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "@/base";

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from route
    const theme = useTheme(); // Use the provided theme

    // State to hold product details
    const [productDetails, setProductDetails] = useState({
        id: "",
        product_name: "",
        category: "",
        barcode: "",
        expiration_date: "",
        user_id: ""
    });
    const [merchant, setMerchant] = useState("");

    // fetch product details based on ID 
    useEffect(() => {
        axios
            .get(`${apiUrl}/admin/products/${id}`)
            .then((res) => {
                setProductDetails(res.data.product);
            }).catch((error) => {
                console.log(error);
            });
    }, [id]);

    // fetch merchant details based on user_id
    useEffect(() => {
        if (productDetails.user_id) {
            axios
                .get(`${apiUrl}/admin/merchants/${productDetails.user_id}`)
                .then((res) => {
                    setMerchant(res.data.User.name);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }, [productDetails]);

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
                    Product Details ({productDetails.product_name})
                </Typography>

                <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
                    <List>
                        <ListItem>
                            <ListItemText primary="Product Name" secondary={productDetails.product_name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Category" secondary={productDetails.category} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Barcode" secondary={productDetails.barcode} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Expiration Date" secondary={productDetails.expiration_date} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Merchant (Owner)" secondary={merchant} />
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        </Box>
    );
};

export default ProductDetails;
