import { User } from "../../interfaces/user";
import CaseNoteForm from "../Form/CaseNoteForm/CaseNoteForm";
import { Content, Wrapper } from './CaseNoteControl.styles'

interface CaseNoteControlProps {
    patient: User
}

const CasenoteControl = ({ patient }: CaseNoteControlProps) => {
    return (
        <Wrapper>
            <Content>
                <CaseNoteForm patient={patient} onSubmit={() => { } } onCancel={() => { }}/>
            </Content>
        </Wrapper>
    );
}

export default CasenoteControl;
