import { Item } from "@/scenes/global/Sidebar";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';


const MerchantSidebarItems = ({ selected, setSelected }) => {
    return (
        <>
            {/* Service Request page */}
            <Item
                title="Service Request"
                to="/merchant/home"
                icon={<CategoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
        </>
    )
}

export default MerchantSidebarItems