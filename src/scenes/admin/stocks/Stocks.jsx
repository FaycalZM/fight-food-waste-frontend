import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "@/theme";
import { mockDataTeam } from "@/data/mockData";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import Header from "@/components/Header";
import { useNavigate } from "react-router";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useContext } from "react";
import { DataContext } from "@/context/DataContext";
import axios from "axios";
import apiUrl from "@/base";


const Stocks = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { stocks, setStocks } = useContext(DataContext);

    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "warehouse_location",
            headerName: "Location In Warehouse",
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
                            startIcon={<InfoOutlinedIcon />}
                            onClick={() => navigate(`/admin/stocks/${id}`)}
                        >
                            view details
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<EditOutlinedIcon />}
                            onClick={() => navigate(`/admin/stocks/${id}/products/add`)}
                        >
                            Add Product
                        </Button>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Stocks" subtitle="Manage Your Stocks" />
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => navigate("/admin/stocks/add")}
                    >
                        <WarehouseOutlinedIcon sx={{ mr: "10px" }} />
                        Add Stock
                    </Button>
                </Box>
            </Box>
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
                <DataGrid
                    checkboxSelection
                    rows={stocks}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default Stocks;
