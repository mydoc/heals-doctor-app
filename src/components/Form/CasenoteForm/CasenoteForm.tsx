import { User } from "../../../interfaces/user";
import { Form, FormActions, FormField, FormFieldInput, FormFieldNote, FormSectionTitle, FormWrapper } from "../Form.styles";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IconButton } from "@mui/material";
import SlideOut from "../../../braincase/Form/SlideOut/SlideOut";
import { useState } from "react";
import Icd10Form from "../Icd10Form";
import { IIcd10 } from "../../../interfaces/records";
import ClearIcon from '@mui/icons-material/Clear';
import { Icd10Item } from "./CasenoteForm.styles";

interface CasenoteFormProps {
    patient: User;
    onSubmit?: (e: any) => void;
    onCancel?: (e: any) => void;
}

const CasenoteForm = ({ patient, onSubmit, onCancel }: CasenoteFormProps) => {

    const [isIcd10Open, setIsIcd10Open] = useState(false);

    const [seletedIcd10, setSelectedIcd10] = useState<IIcd10[]>([]);

    return (
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
                    <IconButton onClick={() => setIsIcd10Open(true)}><PlaylistAddIcon /></IconButton>
                    {seletedIcd10.map(icd => (
                        <Icd10Item className="code" key={icd.id}>
                            <div>{icd.code}</div>
                            <div>{icd.desc}</div>
                            <div className="icon"><IconButton onClick={() => setSelectedIcd10(prev => prev.filter(keep => keep.id !== icd.id))}><ClearIcon fontSize="small" /></IconButton></div>
                        </Icd10Item>
                    ))}
                    <FormFieldInput><textarea /></FormFieldInput>
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
            <SlideOut title="Select ICD10 diagnosis" open={isIcd10Open} onClose={() => setIsIcd10Open(false)}>
                <Icd10Form selectedItems={seletedIcd10} onSelectItem={(item: IIcd10) => setSelectedIcd10(prev => [...prev, item])}/>
            </SlideOut>
        </FormWrapper>
    )
};

export default CasenoteForm;
