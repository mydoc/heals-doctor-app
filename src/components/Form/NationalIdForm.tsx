import { User } from "../../interfaces/user";
import { Form, FormActions, FormField, FormFieldInput, FormFieldNote, FormSectionTitle, FormWrapper } from "./Form.styles";

interface NationalIdFormProps {
    patient: User;
    onSubmit?: (e: any) => void;
    onCancel?: (e: any) => void;
}

const NationalIdForm = ({ patient, onSubmit, onCancel }: NationalIdFormProps) => (
    <FormWrapper>
        <Form onSubmit={(e) => onSubmit && onSubmit(e)} >
            <FormSectionTitle>Identification</FormSectionTitle>
            <FormField>
                <label>Identification type</label>
                <FormFieldInput>
                    <select>
                        <option>NRIC</option>
                        <option>Passport</option>
                    </select>
                </FormFieldInput>
                <FormFieldNote>Patients must present their identification document during the consultation as part of the regulation in the respective local regulations.</FormFieldNote>
            </FormField>
            <FormField>
                <label>Identification number</label>
                <FormFieldInput><input type="text" /></FormFieldInput>
            </FormField>
            <FormField>
                <label>Front image</label>
                <FormFieldInput><input type="file" /></FormFieldInput>
            </FormField>
            <FormField>
                <label>Back image</label>
                <FormFieldInput><input type="file" /></FormFieldInput>
            </FormField>
            <FormActions>
                <button type="submit">OK</button>
                <button type="button" onClick={(e) => onCancel && onCancel(e)}>Cancel</button>
            </FormActions>
        </Form>

        <Form onSubmit={(e) => onSubmit && onSubmit(e)} >
            <FormSectionTitle>Medical Conditions</FormSectionTitle>
            <FormField>
                <label>Medical conditions</label>
                <FormFieldInput><textarea>{patient.conditions}</textarea></FormFieldInput>
            </FormField>
            <FormField>
                <label>Medications</label>
                <FormFieldInput><textarea>{patient.conditions}</textarea></FormFieldInput>
            </FormField>
            <FormField>
                <label>Allergies</label>
                <FormFieldInput><textarea>{patient.conditions}</textarea></FormFieldInput>
            </FormField>
            <FormActions>
                <button type="submit">OK</button>
                <button type="button" onClick={(e) => onCancel && onCancel(e)}>Cancel</button>
            </FormActions>
        </Form>
    </FormWrapper>
)

export default NationalIdForm;
