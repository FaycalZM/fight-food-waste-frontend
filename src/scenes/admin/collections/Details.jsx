import { useState, useEffect, useContext } from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "@/base";
import { DataContext } from "@/context/DataContext";

const CollectionDetails = () => {
    const { id } = useParams(); // Get collection ID from route
    const theme = useTheme(); // Use the provided theme

    const { products } = useContext(DataContext);
    // State to hold collection details
    const [collectionDetails, setCollectionDetails] = useState({});
    const [collectedProducts, setCollectedProducts] = useState([]);

    // fetch collection details based on ID 
    useEffect(() => {
        axios
            .get(`${apiUrl}/admin/collections/${id}`)
            .then((res) => {
                console.log(res.data);
                setCollectionDetails(res.data.collection);
                setCollectedProducts(res.data.collection.products);
            })
            .catch((error) => {
                console.log(error);
            });
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
                    maxWidth: "800px",
                    p: 3,
                    borderRadius: "8px",
                    boxShadow: theme.shadows[3],
                    backgroundColor: theme.palette.background.paper,
                    mb: 5,
                }}
            >
                <Typography variant="h4" gutterBottom align="center">
                    Collection Details (ID: {id})
                </Typography>

                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Scheduled Time: {collectionDetails.scheduled_time}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Route: {collectionDetails.route}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Volunteers Count: {collectionDetails.volunteers_count}
                    </Typography>
                </Paper>

                <Typography variant="h5" gutterBottom>
                    Products Collected
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collectedProducts.map((collectedProduct) => (
                                <TableRow key={collectedProduct.product_id}>
                                    <TableCell>{collectedProduct.product_id}</TableCell>
                                    <TableCell>
                                        {
                                            products.find((product) => product.id === collectedProduct.product_id)?.product_name
                                        }
                                    </TableCell>
                                    <TableCell align="right">{collectedProduct.quantity_collected}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default CollectionDetails;
