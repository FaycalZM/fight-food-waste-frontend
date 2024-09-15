import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Avatar, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import { Link, useParams } from "react-router-dom";

const AddBeneficiaryToDistribution = () => {
    const theme = useTheme(); // Use the provided theme
    const [formData, setFormData] = useState({
        beneficiary_id: null,
    });

    const navigate = useNavigate();
    const { id } = useParams();


    const [beneficiaries, setBeneficiaries] = useState([]); // Beneficiaries list


    // Fetch beneficiaries (simulate API call or fetch from server)
    useEffect(() => {
        // Replace this with real API call
        const fetchBeneficiaries = async () => {
            // Replace this with your API or data fetching logic
            const beneficiariesData = [
                { id: 1, name: "beneficiary A" },
                { id: 2, name: "beneficiary B" },
                { id: 3, name: "beneficiary C" },
            ];
            setBeneficiaries(beneficiariesData);
        };
        fetchBeneficiaries();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //  logic here
        console.log("Added beneficiary to distribution id : ", id, "\ndata", formData);
        // Redirect after successfull creation
        // navigate("/admin/stocks");
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
                    <WarehouseOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Beneficiary To Distribution
                </Typography>
                <form onSubmit={handleSubmit}>
                    {/* Beneficiaries dropdown */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="beneficiary-label">Beneficiary</InputLabel>
                        <Select
                            labelId="beneficiary-label"
                            id="beneficiary_id"
                            name="beneficiary_id"
                            value={formData.beneficiary_id}
                            label="Beneficiary"
                            onChange={handleChange}
                        >
                            {beneficiaries.map((beneficiary) => (
                                <MenuItem key={beneficiary.id} value={beneficiary.id}>
                                    {beneficiary.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Add Beneficiary
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default AddBeneficiaryToDistribution;
