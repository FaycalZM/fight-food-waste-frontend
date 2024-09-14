import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Avatar, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { Link } from "react-router-dom";

const VolunteerSignup = () => {
    const theme = useTheme(); // Use the provided theme
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact_info: "",
        address: "",
        skill_id: "",
        availability_start: "",
        availability_end: "",
        password: "",
        confirmedPassword: "",
    });

    const [skills, setSkills] = useState([]); // Skills list

    const navigate = useNavigate();

    // Fetch skills (simulate API call or fetch from server)
    useEffect(() => {
        // Replace this with real API call
        const fetchSkills = async () => {
            // Replace this with your API or data fetching logic
            const skillsData = [
                { id: 1, name: "Skill A" },
                { id: 2, name: "Skill B" },
                { id: 3, name: "Skill C" },
            ];
            setSkills(skillsData);
        };

        fetchSkills();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add signup logic here
        console.log("Volunteer Signup Data:", formData);
        // Redirect after signup
        // navigate("/volunteer/dashboard");
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
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    p: 3,
                    borderRadius: "8px",
                    boxShadow: theme.shadows[3],
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Avatar
                    sx={{
                        m: "auto",
                        bgcolor: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    <VolunteerActivismOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" align="center" gutterBottom>
                    Volunteer Signup
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        label="Contact Info"
                        name="contact_info"
                        value={formData.contact_info}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="skill-label">Skill</InputLabel>
                        <Select
                            labelId="skill-label"
                            id="skill_id"
                            name="skill_id"
                            value={formData.skill_id}
                            label="Skill"
                            onChange={handleChange}
                        >
                            {skills.map((skill) => (
                                <MenuItem key={skill.id} value={skill.id}>
                                    {skill.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Time pickers for availability */}
                    <TextField
                        label="Availability Start"
                        name="availability_start"
                        value={formData.availability_start}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="time" // Use time input type to ensure correct format
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                            htmlInput: {
                                step: 300, // 5 minutes
                            }
                        }}
                    />
                    <TextField
                        label="Availability End"
                        name="availability_end"
                        value={formData.availability_end}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="time" // Use time input type to ensure correct format
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                            htmlInput: {
                                step: 300, // 5 minutes
                            }
                        }}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography
                            variant="h6"
                            align="center"
                            gutterBottom>
                            Already have an account?
                        </Typography>
                        <Link
                            to={"/volunteer/login"}
                            style={{ textDecoration: "underline", color: theme.palette.secondary, fontWeight: "bold" }}
                        >
                            Login
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default VolunteerSignup;
