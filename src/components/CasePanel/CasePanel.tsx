import { useEffect, useState } from 'react';
import MenuButton from '../MenuButton/MenuButton';
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import MenuIcon from '@mui/icons-material/Menu';
import Panel from '../../braincase/Form/Panel/Panel';
import CasenoteControl from '../CaseNoteControl/CaseNoteControl';
import { UserRole } from '../../interfaces/user';
import { Episode, EpisodeType } from '../../interfaces/episode';
import PatientControl from '../PatientControl/PatientControl';
import CartControl from '../CartControl/CartControl';
import Generator from '../../utils/Generator';
import { TwoColumnView } from './CasePanel.styles';

interface CasePanelProps {
    episode: Episode | null
}

const CasePanel = ({ episode }: CasePanelProps) => {

    enum What {
        Patient,
        CaseNote,
        eDocs,
        Rx,
        History,
        Lab
    };

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [what, setWhat] = useState<What | null>(What.Patient);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchor);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, what: What) => {
        setAnchor(event.currentTarget);
        setWhat(what);
    }
    const handleClose = () => {
        setMenuAnchor(null);
    }

    const patient = episode?.participants.find(p => p.role === UserRole.patient) ?? null;
    // const doctor = episode?.participants.find(p => p.role === UserRole.doctor) ?? null;

    const selectControl = () => {
        switch(what) {
            case What.Patient:
                return <PatientControl patient={patient!} />
            case What.Lab:
                return <CartControl patient={patient!} />
            default:
                return <CasenoteControl patient={patient!} />
        }
    }

    const isPatientCase = episode && [EpisodeType.Diary, EpisodeType.HealthScreening].includes(episode.type);

    useEffect(() => {
        if (!isPatientCase && what && ![What.Patient].includes(what)) setWhat(What.Patient);
    }, [isPatientCase, what, What.Patient])

    return (
        <Panel anchor={anchor} control={
            <div>{selectControl()}</div>
            // <TwoColumnView>
            //     <div>{selectControl()}</div>
            //     <div>Billing</div>
            // </TwoColumnView>
        }>
            <MenuButton id="file-button" onClick={e => handleClick(e, What.Patient)}>Patient</MenuButton>
            {!isPatientCase ? <></> : (
                <>
                    <MenuSeparator />
                    <MenuButton onClick={e => handleClick(e, What.CaseNote)}>Case Note</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.eDocs)}>e-Docs</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.Rx)}>Rx</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.History)}>History</MenuButton>
                    <MenuButton onClick={e => handleClick(e, What.Lab)}>Lab</MenuButton>
                    <MenuSeparator />
                    <MenuButton onClick={e => setIsCartOpen(prev => !prev)}>Cart</MenuButton>
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
