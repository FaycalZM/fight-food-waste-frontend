import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";
import { mockDataTeam } from "@/data/mockData";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "@/components/Header";
import { useNavigate } from "react-router";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const DistributionsHistory = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
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
                            color="success"
                            variant="contained"
                            startIcon={<DownloadOutlinedIcon />}
                        >
                            Download Report
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<CloseOutlinedIcon />}
                        >
                            Delete History
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Distributions History" subtitle="Manage your distributions history" />
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
                <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
            </Box>
        </Box>
    );
};

export default DistributionsHistory;
