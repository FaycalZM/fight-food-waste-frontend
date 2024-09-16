import { useState, useEffect, useContext } from "react";
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
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';



const CollectionPlanning = () => {
    const theme = useTheme(); // Use the provided theme
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        scheduled_time: "",
        route: "",
        volunteers_count: "",
        user_ids: [],
    });

    const {
        merchants,
        collections,
        setCollections
    } = useContext(DataContext);

    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Handle checkbox change for selecting multiple users
    const handleUserSelection = (event) => {
        const { value, checked } = event.target;
        setFormData((prevData) => {
            if (checked) {
                // Add user to selectedUsers if checked
                return { ...prevData, user_ids: [...prevData.user_ids, value] };
            } else {
                // Remove user from selectedUsers if unchecked
                return { ...prevData, user_ids: prevData.user_ids.filter((user_id) => user_id !== value) };
            }
        });
    };

    const create_collection = (formData) => {
        axios
            .post(`${apiUrl}/admin/add_collection`, formData)
            .then((res) => {
                setCollections({
                    ...collections,
                    scheduled: [...collections.scheduled, res.data.collection],
                });
                setResponse(res.data.message);
                setError("");
            }).catch((error) => {
                setError(error.response.data.message);
                setResponse("");
            })
    }

    const start_collection = (id) => {
        axios
            .get(`${apiUrl}/admin/collections/${id}/start`)
            .then((res) => {
                // update state
                setCollections({
                    ...collections,
                    scheduled: collections.scheduled.filter((collection) => collection.id !== id),
                    in_progress: [...collections.in_progress, res.data.collection],
                });
            }).catch((error) => {
                console.log(error);
            });
    }
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        formData.user_ids = formData.user_ids.join(",");
        create_collection(formData);
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
                    Plan a New Collection
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
                    {/* checkbox to select multiple users */}
                    <Typography variant="h5" gutterBottom my={2} >
                        Select Merchants
                    </Typography>
                    <FormGroup>
                        {merchants.active.map((merchant) => (
                            <FormControlLabel
                                key={merchant.id}
                                control={
                                    <Checkbox
                                        value={merchant.id}
                                        checked={formData.user_ids.includes(String(merchant.id))}
                                        onChange={handleUserSelection}
                                    />
                                }
                                label={merchant.name}
                            />
                        ))}
                    </FormGroup>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Plan Collection
                    </Button>
                </form>
            </Box>

            {/* Scheduled Collections Section */}
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
                    Scheduled Collections
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Scheduled Time</TableCell>
                                <TableCell>Route</TableCell>
                                <TableCell align="right">Volunteers Count</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collections.scheduled.map((collection) => (
                                <TableRow key={collection.id}>
                                    <TableCell>{collection.id}</TableCell>
                                    <TableCell>{collection.scheduled_time}</TableCell>
                                    <TableCell>{collection.route}</TableCell>
                                    <TableCell align="right">{collection.volunteers_count}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
                                            onClick={() => start_collection(collection.id)}
                                        >
                                            Start Collection
                                        </Button>
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

export default CollectionPlanning;
