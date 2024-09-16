import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";
import { mockDataTeam } from "@/data/mockData";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Header from "@/components/Header";
import { useNavigate } from "react-router";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";


const InProgressDistributions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { distributions, setDistributions } = useContext(DataContext);

    const close_distribution = (id) => {
        axios
            .get(`${apiUrl}/admin/distributions/${id}/close`)
            .then((res) => {
                setDistributions({
                    ...distributions,
                    in_progress: distributions.in_progress.filter((distribution) => distribution.id !== id),
                    completed: [...distributions.completed, res.data.distribution],
                });
            }).catch((error) => {
                console.log(error);
            })
    }

    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "scheduled_time",
            headerName: "Schedulet At",
            flex: 1,
        },
        {
            field: "route",
            headerName: "Trajectory",
            flex: 1,
        },
        {
            field: "volunteers_count",
            headerName: "Volunteers needed",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 2,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box
                        display={"flex"}
                        justifyContent="start"
                        alignItems="center"
                        gap={2}
                        m={"0 auto"}
                        p={"5px"}
                    >
                        <Button
                            color="secondary"
                            variant="contained"
                            startIcon={<InfoOutlinedIcon />}
                            onClick={() => navigate(`/admin/distributions/${id}`)}
                        >
                            View Details
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<CloseOutlinedIcon />}
                            onClick={() => close_distribution(id)}
                        >
                            Close Distribution
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Distributions In Progress" subtitle="Manage the distributions happening now" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={distributions.in_progress} columns={columns} />
            </Box>
        </Box>
    );
};

export default InProgressDistributions;
