import { User } from "../../../interfaces/user";
import { Form, FormActions, FormField, FormFieldInput, FormFieldNote, FormSectionTitle, FormTagList, FormWrapper } from "../Form.styles";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IconButton } from "@mui/material";
import SlideOut from "../../../braincase/Form/SlideOut/SlideOut";
import { useContext, useState } from "react";
import Icd10Form from "../Icd10Form";
import { IIcd10 } from "../../../interfaces/records";
import ClearIcon from '@mui/icons-material/Clear';
import { Icd10Item } from "./CaseNoteForm.styles"; // fix filename
import { DataContext, IDataContext } from "../../../contexts/DataContext";
import Generator from "../../../utils/Generator";
import { IDrug } from "../../../interfaces/data";

interface CasenoteFormProps {
    patient: User;
    onSubmit?: (e: any) => void;
    onCancel?: (e: any) => void;
}

const CasenoteForm = ({ patient, onSubmit, onCancel }: CasenoteFormProps) => {

    // context
    const { data } = useContext<IDataContext>(DataContext);

    // UI states
    const [isIcd10Open, setIsIcd10Open] = useState(false);
    const [selectedIcd10, setSelectedIcd10] = useState<IIcd10[]>([]);
    const [selectedDrug, setSelectedDrug] = useState<IDrug[]>([]);

    // auto-suggest
    const [suggestedDiagnosis, setSuggestedDiagnosis] = useState<IIcd10[]>();
    const [suggestedDrug, setSuggestedDrug] = useState<IDrug[]>();

    const updateSuggestions = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const found = Math.random() * 10 > 8;

        if (found) {
            const count = Generator.random(1, 5);
            setSuggestedDiagnosis(Generator.any(data.icd10, count));
            setSuggestedDrug(Generator.any(data.drugBank, count));
        }
    }

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
                    <FormFieldInput><textarea onChange={(e) => updateSuggestions(e)}></textarea></FormFieldInput>
                </FormField>
                <FormField>
                    <label>Private Notes</label>
                    <FormFieldInput><textarea></textarea></FormFieldInput>
                    <FormFieldNote>Private notes are not shown to the patient. Use it to record clinical notes e.g. patient, location, subjective, objective, assessment, plan.</FormFieldNote>
                </FormField>
                <FormField>
                    <label>Diagnosis</label>
                    <IconButton onClick={() => setIsIcd10Open(true)}><PlaylistAddIcon /></IconButton>
                    <FormTagList>
                        {suggestedDiagnosis?.map(d =>
                            <li key={d.id} onClick={() => setSelectedIcd10(prev => [...prev, d])}>{d.desc}</li>
                        )}
                    </FormTagList>
                    {selectedIcd10.map(icd => (
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

                <FormField>
                    <label>Prescription</label>
                    <IconButton onClick={() => setIsIcd10Open(true)}><PlaylistAddIcon /></IconButton>
                    {selectedDrug?.map(drug => (
                        <Icd10Item className="code" key={drug.id}>
                            <div>{drug.name}</div>
                            <div>{drug.frequency}</div>
                            <div className="icon"><IconButton onClick={() => setSelectedIcd10(prev => prev.filter(keep => keep.id !== drug.id))}><ClearIcon fontSize="small" /></IconButton></div>
                        </Icd10Item>
                    ))}
                    <FormTagList>
                        {suggestedDrug?.map(d =>
                            <li key={d.id}>{d.name}</li>
                        )}
                    </FormTagList>
                    <FormFieldInput><textarea /></FormFieldInput>
                    <FormFieldInput>
                        <table>
                            <tr>
                                <th>Drug</th>
                                <th>Dosage</th>
                                <th>Unit</th>
                                <th>Frequency</th>
                                <th>Duration</th>
                                <th>Quantity</th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </FormFieldInput>
                </FormField>

                <FormField>
                    <label>Sales Items</label>
                    <IconButton onClick={() => setIsIcd10Open(true)}><PlaylistAddIcon /></IconButton>
                    <FormFieldInput><textarea /></FormFieldInput>
                </FormField>

                <FormActions>
                    <button type="submit">OK</button>
                    <button type="button" onClick={(e) => onCancel && onCancel(e)}>Cancel</button>
                </FormActions>
            </Form>
            <SlideOut title="Select ICD10 diagnosis" open={isIcd10Open} onClose={() => setIsIcd10Open(false)}>
                <Icd10Form selectedItems={selectedIcd10} onSelectItem={(item: IIcd10) => setSelectedIcd10(prev => [...prev, item])}/>
            </SlideOut>
        </FormWrapper>
    )
};

export default CasenoteForm;
