import { User } from "../../interfaces/user";
import CasenoteForm from "../Form/CasenoteForm/CasenoteForm";
import { Content, Wrapper } from './CasenoteControl.styles'

interface CaseNoteControlProps {
    patient: User
}

const CasenoteControl = ({ patient }: CaseNoteControlProps) => {
    return (
        <Wrapper>
            <Content>
                <CasenoteForm patient={patient} onSubmit={() => { } } onCancel={() => { }}/>
            </Content>
        </Wrapper>
    );
}

export default CasenoteControl;
