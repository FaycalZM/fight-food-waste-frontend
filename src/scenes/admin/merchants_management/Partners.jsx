import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";
import { mockDataTeam } from "@/data/mockData";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Header from "@/components/Header";
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import apiUrl from "@/base";
import axios from "axios";

const Partners = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { merchants, setMerchants } = useContext(DataContext);

    const rowsData = merchants.active;

    const deleteMerchant = (id) => {
        axios
            .get(`${apiUrl}/admin/merchants/${id}/delete`)
            .then((res) => {
                // update state
                setMerchants({
                    ...merchants,
                    active: merchants.active.filter((merchant) => merchant.id !== id)
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
            cellClassName: "name-column--cell",
            flex: 1,
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
            field: "membership_status",
            headerName: "Membership Status",
            flex: 1,
        },
        {
            field: "membership_expiry_date",
            headerName: "Membership Expiry Date",
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
                            color="error"
                            variant="contained"
                            startIcon={<CloseOutlinedIcon />}
                            onClick={() => deleteMerchant(id)}
                        >
                            Delete
                        </Button>
                    </Box>

                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Our Merchants" subtitle="Managing the Merchants" />
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

export default Partners;
