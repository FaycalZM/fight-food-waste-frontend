import React from 'react'
import { Typography, useTheme } from "@mui/material";
import { Item } from '../../global/Sidebar'
import { tokens } from '../../../theme';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import PlaylistAddCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCircleOutlined';
import BrowseGalleryOutlinedIcon from '@mui/icons-material/BrowseGalleryOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

const AdminSidebarItems = ({ selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
            <Item
                title="Dashboard"
                to="/admin/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
            >
                Merchants
            </Typography>
            <Item
                title="New subscriptions"
                to="/admin/merchants/new"
                icon={<CardMembershipOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Partners"
                to="/admin/merchants/valid"
                icon={<LoyaltyOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            {/* users management (merchants management +  volunteers management)
                  ->  merchants management -> new subscriptions (approve / decline) + existing subscriptions (block/ unblock)
                  ->  volunteers management -> new applications (approve / decline) + existing applications  (block/ unblock)
                  */}
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
            >
                Volunteers
            </Typography>
            <Item
                title="New applications"
                to="/admin/volunteers/new"
                icon={<PendingOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Members"
                to="/admin/volunteers/valid"
                icon={<HowToRegOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            {/* stocks management */}
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
            >
                Stocks
            </Typography>
            <Item
                title="Manage stocks"
                to="/admin/stocks"
                icon={<InventoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            {/* planification (collections + distributions)
                   -> collections planification + history
                   -> distributions planification + history
                   */}
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
            >
                Collections
            </Typography>
            <Item
                title="Plan collections"
                to="/admin/collections/planning"
                icon={<PlaylistAddCircleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Collections history"
                to="/admin/collections/history"
                icon={<BrowseGalleryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
            >
                Distributions
            </Typography>
            <Item
                title="Plan distributions"
                to="/admin/distributions/planning"
                icon={<ConnectWithoutContactOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            <Item
                title="Distributions history"
                to="/admin/distributions/history"
                icon={<HistoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
        </>
    )
}

export default AdminSidebarItems