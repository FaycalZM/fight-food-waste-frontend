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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";

const MerchantHome = () => {
    const theme = useTheme(); // Use the provided theme
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        start_time: "",
        task_type: "",
    });

    const {
        products,
        beneficiaries,
        distributions,
        setDistributions
    } = useContext(DataContext);

    const [tasks, setTasks] = useState([
        {
            id: 1,
            task_type: 'Collection',
        },
        {
            id: 2,
            task_type: 'Distribution',
        },
        {
            id: 3,
            task_type: 'Cook',
        },
        {
            id: 4,
            task_type: 'Driver',
        },
        {
            id: 5,
            task_type: 'Plumber',
        },
        {
            id: 6,
            task_type: 'Mechanic',
        }
    ]);
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // service request here
        axios
            .post(`${apiUrl}/merchant/${localStorage.getItem("id")}/service`, formData)
            .then((response) => {
                if (response.data.volunteer) {
                    setError("");
                    setResponse(`Volunteer assigned: ${response.data.volunteer.name}`);
                } else {
                    setResponse("");
                    setError("No volunteer available");
                }
            }).catch((error) => {
                setError(error.response.data.message);
                setResponse("");
            })
        // clear form data
        setFormData({
            start_time: "",
            task_type: "",
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
                    Request a service
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
                    {/* Task type */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="task-label">Task</InputLabel>
                        <Select
                            labelId="task-label"
                            id="task_type"
                            name="task_type"
                            value={formData.task_type}
                            label="Task"
                            onChange={handleChange}
                        >
                            {tasks.map((task) => (
                                <MenuItem key={task.id} value={task.task_type}>
                                    {task.task_type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Scheduled Time */}
                    <TextField
                        label="Scheduled Start Time"
                        name="start_time"
                        value={formData.start_time}
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


                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Request Service
                    </Button>
                </form>
            </Box>

        </Box>
    );
}

export default MerchantHome