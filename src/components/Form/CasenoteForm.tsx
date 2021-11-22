import { User } from "../../interfaces/user";
import { Form, FormActions, FormField, FormFieldInput, FormFieldNote, FormSectionTitle, FormWrapper } from "./Form.styles";

import icd10 from '../../icd10_codes.json';

interface CasenoteFormProps {
    patient: User;
    onSubmit?: (e: any) => void;
    onCancel?: (e: any) => void;
}

const CasenoteForm = ({ patient, onSubmit, onCancel }: CasenoteFormProps) => (
    <FormWrapper>
        <Form onSubmit={(e) => onSubmit && onSubmit(e)} >
            <FormSectionTitle>Casenote</FormSectionTitle>
            <FormField>
                <label>Consulted For</label>
                <FormFieldInput>
                    <div><input type="radio" name="consulted-form" value="Self" /> <span>Self</span></div>
                    <div><input type="radio" name="consulted-form" value="Spouse" /> <span>Spouse</span></div>
                    <div><input type="radio" name="consulted-form" value="Child" /> <span>Child</span></div>
                    <div><input type="radio" name="consulted-form" value="Parent" /> <span>Parent</span></div>
                    <div><input type="radio" name="consulted-form" value="None" /> <span>None</span></div>
                </FormFieldInput>
            </FormField>
            <FormField>
                <label>Presenting Complaint(s)</label>
                <FormFieldInput><textarea></textarea></FormFieldInput>
            </FormField>
            <FormField>
                <label>Private Notes</label>
                <FormFieldInput><textarea></textarea></FormFieldInput>
                <FormFieldNote>Private notes are not shown to the patient. Use it to record clinical notes e.g. patient, location, subjective, objective, assessment, plan.</FormFieldNote>
            </FormField>
            <FormField>
                <label>Diagnosis</label>
                <FormFieldInput><textarea>{icd10[0].desc}</textarea></FormFieldInput>
            </FormField>
            <FormField>
                <label>Notes for patient</label>
                <FormFieldInput><textarea></textarea></FormFieldInput>
            </FormField>
            <FormActions>
                <button type="submit">OK</button>
                <button type="button" onClick={(e) => onCancel && onCancel(e)}>Cancel</button>
            </FormActions>
        </Form>
    </FormWrapper>
)

export default CasenoteForm;
