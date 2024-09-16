import React from 'react'
import { Item } from '../../global/Sidebar'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const VolunteerSidebarItems = ({ selected, setSelected }) => {
    return (
        <>
            {/* missions schedule page */}
            <Item
                title="Schedule"
                to="/volunteer/home"
                icon={<CalendarMonthOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
            />
        </>
    )
}

export default VolunteerSidebarItems