import { useState } from "react";
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuIcon from '@mui/icons-material/Menu';
import VideocamIcon from '@mui/icons-material/Videocam';

import { Appointment, AppointmentStatus } from "../../interfaces/episode";
import MenuLabel from "../MenuLabel/MenuLabel";
import Panel from "../../braincase/Form/Panel/Panel";
import AppointmentsControl from "../AppointmentsControl/AppointmentsControl";
import { User } from "../../interfaces/user";
import PatientControl from "../PatientControl/PatientControl";

interface PatientPanelProps {
    patient: User;
}

const PatientPanel = ({ patient }: PatientPanelProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [statusFilters, setStatusFilters] = useState<AppointmentStatus[]>([AppointmentStatus.New, AppointmentStatus.Accepted]);


    return (
        <Panel control={<PatientControl patient={patient} />}>
            <VideocamIcon /><MenuLabel>{patient.name}</MenuLabel>
            <div className="align-right"><IconButton id="expand-menu-chat" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)}><MenuIcon /></IconButton></div>
        </Panel>
    );
}

export default PatientPanel;
