import { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuIcon from '@mui/icons-material/Menu';

import { Appointment, AppointmentStatus } from "../../interfaces/episode";
import MenuLabel from "../MenuLabel/MenuLabel";
import Panel from "../Panel/Panel";
import AppointmentsControl from "../AppointmentsControl/AppointmentsControl";

interface AppointmentsPanelProps {
    appointments: Appointment[] | null;
}

const AppointmentsPanel = ({ appointments }: AppointmentsPanelProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [statusFilters, setStatusFilters] = useState<AppointmentStatus[]>([AppointmentStatus.New, AppointmentStatus.Accepted]);
    const [view, setView] = useState<'stacked' | 'timeline'>('stacked');

    const isMenuOpened = Boolean(anchor);

    const toogleTypeFilter = (status: AppointmentStatus) => {
        if (statusFilters.includes(status))
            setStatusFilters(prev => prev.filter(s => s !== status));
        else
            setStatusFilters(prev => [...prev, status]);
    }

    const showType = (status: AppointmentStatus) => {
        return statusFilters.includes(status);
    }

    const getFilteredAppointments = () => {
        return appointments?.filter(a => statusFilters.includes(a.status)) ?? [];
    }

    return (
        <Panel control={<AppointmentsControl sortedAppointments={getFilteredAppointments()} view={view}/>}>
            <InfoIcon /><MenuLabel>{`Appointments (${getFilteredAppointments().length})`}</MenuLabel>
            <div className="align-right"><IconButton id="expand-menu-chat" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)}><MenuIcon /></IconButton></div>
            <Menu anchorEl={anchor} open={isMenuOpened} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => {}}>Today</MenuItem>
                <MenuItem onClick={() => {}}>Upcoming</MenuItem>
                <Divider />
                <MenuItem onClick={() => toogleTypeFilter(AppointmentStatus.New)}>{showType(AppointmentStatus.New) ? <ListItemIcon><CheckCircleIcon style={{ color: "yellow" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(AppointmentStatus.New)}>New</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(AppointmentStatus.Accepted)}>{showType(AppointmentStatus.Accepted) ? <ListItemIcon><CheckCircleIcon style={{ color: "green" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(AppointmentStatus.Accepted)}>Accepted</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(AppointmentStatus.Completed)}>{showType(AppointmentStatus.Completed) ? <ListItemIcon><CheckCircleIcon style={{ color: "blue" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(AppointmentStatus.Completed)}>Completed</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(AppointmentStatus.Rejected)}>{showType(AppointmentStatus.Rejected) ? <ListItemIcon><CheckCircleIcon style={{ color: "grey" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(AppointmentStatus.Rejected)}>Rejected</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(AppointmentStatus.Timeout)}>{showType(AppointmentStatus.Timeout) ? <ListItemIcon><CheckCircleIcon style={{ color: "red" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(AppointmentStatus.Timeout)}>Timeout</ListItemText></MenuItem>
                <Divider />
                <MenuItem onClick={() => setView('stacked')}>View Stacked</MenuItem>
                <MenuItem onClick={() => setView('timeline')}>View Timeline</MenuItem>
            </Menu>
        </Panel>
    );
}

export default AppointmentsPanel;
