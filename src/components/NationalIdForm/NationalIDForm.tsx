import { Wrapper } from "./NationalIdForm.styles";

interface NationalIDFormProps {
    onSubmit?: (e: any) => void;
    onCancel?: (e: any) => void;
}

const NationalIdForm = ({ onSubmit, onCancel }: NationalIDFormProps) => (
    <Wrapper>
        <form onSubmit={(e) => onSubmit && onSubmit(e)} >
            <div className="field">
                <label>Identification type</label>
                <div className="input">
                    <select>
                        <option>NRIC</option>
                        <option>Passport</option>
                    </select>
                </div>
            </div>
            <div className="field">
                <label>Identification number</label>
                <div className="input"><input type="text" /></div>
            </div>
            <div className="field">
                <label>Front image</label>
                <div className="input"><input type="file" /></div>
            </div>
            <div className="field">
                <label>Back image</label>
                <div className="input"><input type="file" /></div>
            </div>
            <div className="actions">
                <button type="submit">OK</button>
                <button type="button" onClick={(e) => onCancel && onCancel(e)}>Cancel</button>
            </div>
        </form>
    </Wrapper>
)

export default NationalIdForm;
