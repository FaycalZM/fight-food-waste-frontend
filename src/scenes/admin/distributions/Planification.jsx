import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const DistributionsPlanning = () => {
    const theme = useTheme(); // Use the provided theme
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        scheduledTime: "",
        route: "",
        volunteersCount: "",
    });

    // State to hold scheduled distributions
    const [distributions, setDistributions] = useState([]);

    // Simulate fetching scheduled distributions (replace with actual API call)
    useEffect(() => {
        const fetchScheduledDistributions = async () => {
            const mockData = [
                {
                    id: 1,
                    scheduledTime: "2024-10-01T10:00",
                    route: "Route A",
                    volunteersCount: 5,
                },
                {
                    id: 2,
                    scheduledTime: "2024-10-05T14:00",
                    route: "Route B",
                    volunteersCount: 3,
                },
            ];
            setDistributions(mockData);
        };

        fetchScheduledDistributions();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle creating a new distribution (e.g., send data to the server)
        const newDistribution = {
            id: distributions.length + 1,
            ...formData,
        };
        setCollections([...distributions, newDistribution]);
        setFormData({ scheduledTime: "", route: "", volunteersCount: "" });
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
                <form onSubmit={handleSubmit}>
                    {/* Scheduled Time */}
                    <TextField
                        label="Scheduled Time"
                        name="scheduledTime"
                        value={formData.scheduledTime}
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
                        name="volunteersCount"
                        value={formData.volunteersCount}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number" // number input for volunteers count
                        slotProps={{ input: { min: 1 } }} // restrict to positive numbers
                    />

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
                                <TableCell align="right">Volunteers Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {distributions.map((distribution) => (
                                <TableRow key={distribution.id}>
                                    <TableCell>{distribution.id}</TableCell>
                                    <TableCell>{distribution.scheduledTime}</TableCell>
                                    <TableCell>{distribution.route}</TableCell>
                                    <TableCell align="right">{distribution.volunteersCount}</TableCell>
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
