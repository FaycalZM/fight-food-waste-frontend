import { useState, useEffect, useContext } from "react";
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const DistributionsPlanning = () => {
    const theme = useTheme(); // Use the provided theme
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        scheduled_time: "",
        route: "",
        volunteers_count: "",
        beneficiary_ids: [],
        product_ids: [],
    });

    const {
        products,
        beneficiaries,
        distributions,
        setDistributions
    } = useContext(DataContext);

    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    // checkbox state
    const [beneficiariesCheckbox, setBeneficiariesCheckbox] = useState(false);
    const [productsCheckbox, setProductsCheckbox] = useState(false);

    const toggleBeneficiariesCheckbox = () => {
        setBeneficiariesCheckbox(prev => !prev);
    };
    const toggleProductsCheckbox = () => {
        setProductsCheckbox(prev => !prev);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const create_distribution = (formData) => {
        axios
            .post(`${apiUrl}/admin/add_distribution`, formData)
            .then((res) => {
                setDistributions({
                    ...distributions,
                    scheduled: [...distributions.scheduled, res.data.distribution],
                });
                setResponse(res.data.message);
                setError("");
            }).catch((error) => {
                setError(error.response.data.message);
                setResponse("");
            })
    }

    const start_distribution = (id) => {
        axios
            .get(`${apiUrl}/admin/distributions/${id}/start`)
            .then((res) => {
                // update state
                setDistributions({
                    ...distributions,
                    scheduled: distributions.scheduled.filter((distribution) => distribution.id !== id),
                    in_progress: [...distributions.in_progress, res.data.distribution],
                });
            }).catch((error) => {
                console.log(error);
            });
    }
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        create_distribution(formData);
        // clear form data
        setFormData({
            scheduled_time: "",
            route: "",
            volunteers_count: "",
            beneficiary_ids: [],
            product_ids: [],
        });
    };

    // Handle checkbox change for selecting multiple users
    const handleBenefeciarySelection = (event) => {
        const { value, checked } = event.target;
        setFormData((prevData) => {
            if (checked) {
                // Add beneficiary to beneficiary_ids if checked
                return { ...prevData, beneficiary_ids: [...prevData.beneficiary_ids, value] };
            } else {
                // Remove beneficiary from beneficiary_ids if unchecked
                return { ...prevData, beneficiary_ids: prevData.beneficiary_ids.filter((beneficiary_id) => beneficiary_id !== value) };
            }
        });
    };

    const handleProductSelection = (event) => {
        const { value, checked } = event.target;
        setFormData((prevData) => {
            if (checked) {
                // Add product to selectedProducts if checked
                return { ...prevData, product_ids: [...prevData.product_ids, value] };
            } else {
                // Remove product from selectedProducts if unchecked
                return { ...prevData, product_ids: prevData.product_ids.filter((product_id) => product_id !== value) };
            }
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
                    mb: 5, // Add margin to separate the sections
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Plan a New Distribution
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
                    {/* Scheduled Time */}
                    <TextField
                        label="Scheduled Time"
                        name="scheduled_time"
                        value={formData.scheduled_time}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="datetime-local" // datetime input
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            }
                        }}
                    />

                    {/* Route */}
                    <TextField
                        label="Route"
                        name="route"
                        value={formData.route}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    {/* Volunteers Count */}
                    <TextField
                        label="Volunteers Count"
                        name="volunteers_count"
                        value={formData.volunteers_count}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number" // number input for volunteers count
                        slotProps={{ input: { min: 1 } }} // restrict to positive numbers
                    />
                    {/* checkbox to select multiple beneficiaries */}
                    <Box sx={{ my: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" gutterBottom my={2} >
                            Select Beneficiaries
                        </Typography>
                        <IconButton onClick={toggleBeneficiariesCheckbox}>
                            {
                                beneficiariesCheckbox ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />
                            }
                        </IconButton>
                    </Box>
                    {
                        beneficiariesCheckbox && (
                            <FormGroup>
                                {beneficiaries.map((beneficiary) => (
                                    <FormControlLabel
                                        key={beneficiary.id}
                                        control={
                                            <Checkbox
                                                value={beneficiary.id}
                                                checked={formData.beneficiary_ids.includes(String(beneficiary.id))}
                                                onChange={handleBenefeciarySelection}
                                            />
                                        }
                                        label={beneficiary.name}
                                    />
                                ))}
                            </FormGroup>
                        )
                    }

                    {/* checkbox to select multiple products */}
                    <Box sx={{ my: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" gutterBottom my={2} >
                            Select Products
                        </Typography>
                        <IconButton onClick={toggleProductsCheckbox}>
                            {
                                productsCheckbox ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />
                            }
                        </IconButton>
                    </Box>
                    {
                        productsCheckbox && (
                            <FormGroup>
                                {products.map((product) => (
                                    <FormControlLabel
                                        key={product.id}
                                        control={
                                            <Checkbox
                                                value={product.id}
                                                checked={formData.product_ids.includes(String(product.id))}
                                                onChange={handleProductSelection}
                                            />
                                        }
                                        label={product.product_name}
                                    />
                                ))}
                            </FormGroup>
                        )
                    }

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Plan Distribution
                    </Button>
                </form>
            </Box>

            {/* Scheduled Distributions Section */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    p: 3,
                    borderRadius: "8px",
                    boxShadow: theme.shadows[3],
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Scheduled Distributions
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Scheduled Time</TableCell>
                                <TableCell>Route</TableCell>
                                <TableCell >Volunteers Count</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {distributions.scheduled.map((distribution) => (
                                <TableRow key={distribution.id}>
                                    <TableCell>{distribution.id}</TableCell>
                                    <TableCell>{distribution.scheduled_time}</TableCell>
                                    <TableCell>{distribution.route}</TableCell>
                                    <TableCell >{distribution.volunteers_count}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
                                                onClick={() => start_distribution(distribution.id)}
                                            >
                                                Start Distribution
                                            </Button>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
                                                onClick={() => navigate(`/admin/distributions/${distribution.id}`)}
                                            >
                                                View Details
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default DistributionsPlanning;
