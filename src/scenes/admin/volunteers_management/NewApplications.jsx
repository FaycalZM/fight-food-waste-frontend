import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";
import { mockDataTeam } from "@/data/mockData";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Header from "@/components/Header";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";

const NewApplications = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { volunteers, setVolunteers } = useContext(DataContext);
    const rowData = volunteers.pending;

    const approve_subscription = (id) => {
        axios
            .get(`${apiUrl}/admin/volunteers/${id}/approve_membership`)
            .then((res) => {
                // update state
                setVolunteers({
                    ...volunteers,
                    pending: volunteers.pending.filter((volunteer) => volunteer.id !== id),
                    active: [...volunteers.active, res.data.User],
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    const reject_subscription = (id) => {
        axios
            .get(`${apiUrl}/admin/volunteers/${id}/reject_subscription`)
            .then((res) => {
                // update state
                setVolunteers({
                    ...volunteers,
                    pending: volunteers.pending.filter((volunteer) => volunteer.id !== id)
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
        {
            field: "contact_info",
            headerName: "Contact Info",
            flex: 1,
        },
        {
            field: "skillName",
            headerName: "Skill",
        },
        {
            field: "availability_start",
            headerName: "Available From",
        },
        {
            field: "availability_end",
            headerName: "Available To",
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1.25,
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
                            startIcon={<DoneOutlinedIcon />}
                            onClick={() => approve_subscription(id)}
                        >
                            Validate
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<CloseOutlinedIcon />}
                            onClick={() => reject_subscription(id)}
                        >
                            Reject
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="New Volunteers" subtitle="Managing the Volunteers Applictions" />
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
                <DataGrid checkboxSelection rows={rowData} columns={columns} />
            </Box>
        </Box>
    );
};

export default NewApplications;
