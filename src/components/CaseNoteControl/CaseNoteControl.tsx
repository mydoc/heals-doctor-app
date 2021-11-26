import { IMedicalCertificate } from "../../interfaces/records";
import { User } from "../../interfaces/user";
import CasenoteForm from "../Form/CasenoteForm/CasenoteForm";
import { Content, Wrapper } from "./CaseNoteControl.styles";

interface CaseNoteControlProps {
    patient: User,
    doctor: User,
    onSubmitMedicalCertificate: (e: IMedicalCertificate) => void;
}

const CaseNoteControl = ({ patient, doctor, onSubmitMedicalCertificate }: CaseNoteControlProps) => {
    return (
        <Wrapper>
            <Content>
                <CasenoteForm patient={patient} onSubmit={() => { } } onCancel={() => { }}/>
            </Content>
        </Wrapper>
    );
}

export default CaseNoteControl;
