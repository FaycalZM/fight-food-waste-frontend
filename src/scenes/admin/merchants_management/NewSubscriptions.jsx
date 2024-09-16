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

const NewSubscriptions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { merchants, setMerchants } = useContext(DataContext);
    const rowsData = merchants.pending;

    const rejectSubscription = (id) => {
        axios
            .get(`${apiUrl}/admin/merchants/${id}/reject_subscription`)
            .then((res) => {
                // update state
                setMerchants({
                    ...merchants,
                    pending: merchants.pending.filter((merchant) => merchant.id !== id)
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    const validateSubscription = (id) => {
        axios
            .get(`${apiUrl}/admin/merchants/${id}/approve_membership`)
            .then((res) => {
                // update state
                setMerchants({
                    ...merchants,
                    pending: merchants.pending.filter((merchant) => merchant.id !== id),
                    active: [...merchants.active, res.data.User],
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
            field: "action",
            headerName: "Action",
            flex: 1,
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
                            onClick={() => validateSubscription(id)}
                        >
                            Approve
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<CloseOutlinedIcon />}
                            onClick={() => rejectSubscription(id)}
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
            <Header title="New Merchants" subtitle="Managing the Merchants Registration" />
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
                <DataGrid checkboxSelection rows={rowsData} columns={columns} />
            </Box>
        </Box>
    );
};

export default NewSubscriptions;
