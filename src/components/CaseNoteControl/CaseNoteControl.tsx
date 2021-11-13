import { Wrapper } from "./CaseNoteControl.styles";

const CaseNoteControl = () => (
    <Wrapper>
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
    </Wrapper>
);

export default CaseNoteControl;