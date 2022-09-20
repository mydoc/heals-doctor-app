import { useState } from "react";
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import VideocamIcon from '@mui/icons-material/Videocam';

import { Appointment, AppointmentStatus } from "../../interfaces/episode";
import MenuLabel from "../MenuLabel/MenuLabel";
import Panel from "../../braincase/Form/Panel/Panel";
import { User } from "../../interfaces/user";
import PatientCardControl from "../PatientControl/PatientCardControl";

interface PatientCardPanelProps {
    patient: User;
}

const PatientCardPanel = ({ patient }: PatientCardPanelProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [statusFilters, setStatusFilters] = useState<AppointmentStatus[]>([AppointmentStatus.New, AppointmentStatus.Accepted]);


    return (
        <Panel control={<PatientCardControl patient={patient} />}>
            <VideocamIcon /><MenuLabel>{patient.name}</MenuLabel>
            <div className="align-right"><IconButton id="expand-menu-chat" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)}><MenuIcon /></IconButton></div>
        </Panel>
    );
}

export default PatientCardPanel;
