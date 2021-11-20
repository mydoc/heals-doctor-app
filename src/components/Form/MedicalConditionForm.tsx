import { User } from "../../interfaces/user";
import { Form, FormActions, FormField, FormFieldInput, FormWrapper } from "./Form.styles";

interface MedicalConditionFormProps {
    patient: User;
    onSubmit?: (e: any) => void;
    onCancel?: (e: any) => void;
}

const MedicalConditionForm = ({ patient, onSubmit, onCancel }: MedicalConditionFormProps) => (
    <FormWrapper>
        <Form onSubmit={(e) => onSubmit && onSubmit(e)} >
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

export default MedicalConditionForm;
