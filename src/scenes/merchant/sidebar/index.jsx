import { Item } from "../../global/Sidebar"
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';


const MerchantSidebarItems = ({ selected, setSelected }) => {
    return (
        <>
            {/* products management (CRUD) */}
            <Item
                title="Products management"
                to="/merchant/products"
                icon={<CategoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
            {/* subscription renewal reminders */}
            <Item
                title="Subscription"
                to="/merchant/subscription"
                icon={<NotificationImportantOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
        </>
    )
}

export default MerchantSidebarItems