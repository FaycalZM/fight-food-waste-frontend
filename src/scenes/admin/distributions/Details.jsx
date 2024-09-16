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
import axios from "axios";
import apiUrl from "@/base";

const DistributionsDetails = () => {
    const { id } = useParams(); // Get distribution ID from route
    const theme = useTheme(); // Use the provided theme

    // State to hold distribution details
    const [distributionDetails, setDistributionDetails] = useState({});

    // fetch distribution details based on ID 
    useEffect(() => {
        axios
            .get(`${apiUrl}/admin/distributions/${id}`)
            .then((res) => {
                setDistributionDetails(res.data.distribution);
            }).catch((error) => {
                console.log(error);
            })
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
                        Scheduled Time: {distributionDetails.scheduled_time}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Route: {distributionDetails.route}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Volunteers Count: {distributionDetails.volunteers_count}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Status: {distributionDetails.distribution_status}
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
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {distributionDetails.products && distributionDetails.products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell align="center">{product.id}</TableCell>
                                    <TableCell align="center">{product.product_name}</TableCell>
                                    <TableCell align="center">{product.pivot.quantity_distributed}</TableCell>
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
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Beneficiary Name</TableCell>
                                <TableCell align="center">Beneficiary Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                distributionDetails.beneficiaries && distributionDetails.beneficiaries.map((beneficiary) => (
                                    <TableRow key={beneficiary.id}>
                                        <TableCell align="center">{beneficiary.id}</TableCell>
                                        <TableCell align="center">{beneficiary.name}</TableCell>
                                        <TableCell align="center">{beneficiary.type}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default DistributionsDetails;
