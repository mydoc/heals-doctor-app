import { useState } from "react";
import { IMedicalCertificate } from "../../interfaces/records";
import { User } from "../../interfaces/user";
import MedicalCertificateControl from "../MedicalCertificateControl/MedicalCertificateControl";
import MenuBar from "../MenuBar/MenuBar";
import MenuButton from "../MenuButton/MenuButton";
import MenuLabel from "../MenuLabel/MenuLabel";
import SlideOut from "../SlideOut/SlideOut";
import { Content, Wrapper } from "./CaseNoteControl.styles";

interface CaseNoteControlProps {
    patient: User,
    doctor: User,
    onSubmitMedicalCertificate: (e: IMedicalCertificate) => void;
}

const CaseNoteControl = ({ patient, doctor, onSubmitMedicalCertificate }: CaseNoteControlProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [isSlideOut, setIsSlideOut] = useState(false);

    return (
        <Wrapper>
            <MenuBar anchor={anchor} style={{ backgroundColor: '#CFD6E5' }}>
                <MenuLabel>Options</MenuLabel>
                <MenuButton onClick={(e) => setIsSlideOut(prev => !prev)}>Medical Certificate</MenuButton>
                <MenuButton onClick={(e) => setAnchor(e.currentTarget)}>Referral</MenuButton>
                <MenuButton onClick={(e) => setAnchor(e.currentTarget)}>Prescription</MenuButton>
            </MenuBar>
            <Content>
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
            </Content>
            <SlideOut title='Medical Certificate' open={isSlideOut} onClose={() => setIsSlideOut(prev => !prev)}>
                <MedicalCertificateControl patient={patient!} doctor={doctor!} onSubmit={() => { }} />
            </SlideOut>
        </Wrapper>
    );
}

export default CaseNoteControl;
