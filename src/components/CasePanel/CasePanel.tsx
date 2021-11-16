import { useEffect, useState } from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { IconButton, Menu, MenuItem } from "@mui/material";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import MenuIcon from '@mui/icons-material/Menu';
import Panel from '../Panel/Panel';
import CaseNoteControl from '../CaseNoteControl/CaseNoteControl';
import PropertiesControl from '../PropertiesControl/PropertiesControl';
import { UserRole } from '../../interfaces/user';
import { Episode, EpisodeType } from '../../interfaces/episode';
import PatientControl from '../PatientControl/PatientControl';

interface CasePanelProps {
    episode: Episode | null
}

const CasePanel = ({ episode }: CasePanelProps) => {

    enum What {
        Info,
        Patient,
        CaseNote,
        eDocs,
        Rx,
        History,
        Lab
    };

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [what, setWhat] = useState<What | null>(What.Info);

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchor);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, what: What) => {
        setAnchor(event.currentTarget);
        setWhat(what);
        console.log(event.currentTarget);
    }
    const handleClose = () => {
        setMenuAnchor(null);
    }

    const patient = episode?.participants.find(p => p.role === UserRole.patient) ?? null;

    const selectControl = () => {
        switch(what) {
            case What.Info:
                return <PropertiesControl instance={episode} />
            case What.Patient:
                return <PatientControl patient={patient} />
            default:
                return <CaseNoteControl />
        }
    }

    const isPatientCase = episode && [EpisodeType.Diary, EpisodeType.HealthScreening].includes(episode.type);

    useEffect(() => {
        if (!isPatientCase && what && ![What.Info, What.Patient].includes(what) ) setWhat(What.Info);
    }, [isPatientCase, what, What.Info, What.Patient])

    return (
        <Panel anchor={anchor} control={selectControl()}>
            <FavoriteTwoToneIcon />
            <MenuButton id="file-button" onClick={e => handleClick(e, What.Info)}>Info</MenuButton>
            <MenuButton id="file-button" onClick={e => handleClick(e, What.Patient)}>Patient</MenuButton>
            {!isPatientCase ? <></> : (
                <>
                    <MenuSeparator />
                    <MenuButton onClick={e => handleClick(e, What.CaseNote)}>Case Note</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.eDocs)}>e-Docs</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.Rx)}>Rx</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.History)}>History</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.Lab)}>Lab</MenuButton>
                </>
            )}
            <div className="align-right"><IconButton onClick={(e: React.MouseEvent<HTMLButtonElement>) => setMenuAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
            <Menu id="file-button" anchorEl={menuAnchor} open={isMenuOpen} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Close Consult</MenuItem>
            </Menu>
        </Panel>
    );
}

export default CasePanel;
