import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid2 } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import apiUrl from "@/base";
import axios from "axios";

const VolunteerHome = () => {

    const theme = useTheme(); // Use the provided theme
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");

    useEffect(() => {
        const id = localStorage.getItem('id');
        axios
            .get(`${apiUrl}/volunteer/${id}/schedule`)
            .then((response) => {
                const { message, assignments } = response.data;
                setAssignments(assignments);
                setResponse(message);
                setError("");
            }).catch((error) => {
                setError(error.response.data.message);
                setResponse("");
            })
    }, []);



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
            <Typography variant="h1" gutterBottom>
                Today's Volunteer Assignments
            </Typography>
            <Grid2 container spacing={3}>
                {assignments.length === 0 ? (
                    <Typography variant="h4" mb={8}>No assignments for today.</Typography>
                ) : (
                    assignments.map((assignment) => (
                        <Grid2 item xs={12} sm={6} md={4} key={assignment.id}>
                            <Card sx={{ backgroundColor: theme.palette.background.paper }}>
                                <CardContent>
                                    <Typography variant="h4">
                                        Task: {assignment.task_type}
                                    </Typography>
                                    <Typography variant="h5">
                                        Status: {assignment.assignment_status}
                                    </Typography>
                                    <Typography variant="h5">
                                        Start Time: {assignment.start_time}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))
                )}
            </Grid2>
        </Box>
    );
}

export default VolunteerHome