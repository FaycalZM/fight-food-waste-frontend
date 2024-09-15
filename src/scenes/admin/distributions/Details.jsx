import { useState, useEffect } from "react";
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

const DistributionsDetails = () => {
    const { id } = useParams(); // Get distribution ID from route
    const theme = useTheme(); // Use the provided theme

    // State to hold distribution details
    const [distributionDetails, setDistributionDetails] = useState({
        scheduledTime: "",
        route: "",
        volunteersCount: 0,
        productsCollected: [],
        beneficiaries: [],
    });

    // Simulate fetching distribution details based on ID (replace with actual API call)
    useEffect(() => {
        const fetchDistributionDetails = async () => {
            // Replace this with an actual API call using `id`
            const mockData = {
                scheduledTime: "2024-10-01T10:00",
                route: "Route A",
                volunteersCount: 5,
                productsCollected: [
                    { id: 1, name: "Product A", quantity: 100 },
                    { id: 2, name: "Product B", quantity: 50 },
                    { id: 3, name: "Product C", quantity: 25 },
                ],
                beneficiaries: [
                    { id: 1, name: "Beneficiary A" },
                    { id: 2, name: "Beneficiary B" },
                    { id: 3, name: "Beneficiary C" },
                ],
            };

            setDistributionDetails(mockData);
        };

        fetchDistributionDetails();
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
                    Distribution Details (ID: {id})
                </Typography>

                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Scheduled Time: {distributionDetails.scheduledTime}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Route: {distributionDetails.route}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Volunteers Count: {distributionDetails.volunteersCount}
                    </Typography>
                </Paper>

                <Typography variant="h5" gutterBottom>
                    Products Collected
                </Typography>
                {/* Products list */}
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
                            {distributionDetails.productsCollected.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* beneficiaries list */}
                <Typography sx={{ mt: 3 }} variant="h5" gutterBottom>
                    Beneficiaries
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Beneficiary Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {distributionDetails.beneficiaries.map((beneficiary) => (
                                <TableRow key={beneficiary.id}>
                                    <TableCell>{beneficiary.id}</TableCell>
                                    <TableCell>{beneficiary.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default DistributionsDetails;
