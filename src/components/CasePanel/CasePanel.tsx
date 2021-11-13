import { useState } from 'react';
import MenuBar from '../MenuBar/MenuBar';
import MenuButton from '../MenuButton/MenuButton';
import { Content, Wrapper } from './CasePanel.styles'
import { IconButton, Menu, MenuItem } from "@mui/material";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import MenuIcon from '@mui/icons-material/Menu';


const CasePanel = () => {

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
        console.log(event.currentTarget);
    }
    const handleClose = () => {
        setAnchor(null);
    }

    return (
        <Wrapper>
            <MenuBar anchor={anchor}>
                <FavoriteTwoToneIcon />
                <MenuButton onClick={handleClick}>Case Note</MenuButton>
                <MenuButton onClick={handleClick}>e-Docs</MenuButton>
                <MenuButton onClick={handleClick}>Rx</MenuButton>
                <MenuSeparator />
                <AssignmentIndIcon />
                <MenuButton id="file-button" onClick={handleClick}>Profile</MenuButton>
                <MenuButton onClick={handleClick}>History</MenuButton>
                <MenuButton onClick={handleClick}>Lab</MenuButton>
                <div className="align-right"><IconButton id="expand-menu" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
                <Menu id="file-button" anchorEl={anchor} open={anchor?.id === "expand-menu"} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Close Consult</MenuItem>
                </Menu>
            </MenuBar>
            <Content>
                <div>
                    <form className="casenote-form">
                        <div className="input-field">
                            <label>Consulted For</label>
                            <div className="radio-group">
                                <div><input type="radio" name="consulted-form" value="Self" /> <span>Self</span></div>
                                <div><input type="radio" name="consulted-form" value="Spouse" /> <span>Spouse</span></div>
                                <div><input type="radio" name="consulted-form" value="Child" /> <span>Child</span></div>
                                <div><input type="radio" name="consulted-form" value="Parent" /> <span>Parent</span></div>
                                <div><input type="radio" name="consulted-form" value="None" /> <span>None</span></div>
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Presenting Complaint(s)</label>
                            <textarea></textarea>
                        </div>
                        <div className="input-field">
                            <label>Private Notes (not for patient). Please type your clinical notes below (patient, location, subjective, objective, assessment, plan)</label>
                            <textarea></textarea>
                        </div>
                        <div className="input-field">
                            <label>Diagnosis</label>
                            <textarea></textarea>

                            <div><input type="checkbox" name="other-diagnosis" /> <span>Other Diagnosis</span></div>
                            <textarea></textarea>
                        </div>
                        <div className="input-field">
                            <label>Notes for Patient*</label>
                            <textarea></textarea>
                        </div>
                    </form>
                </div>
            </Content>
        </Wrapper>
    );
}

export default CasePanel;
