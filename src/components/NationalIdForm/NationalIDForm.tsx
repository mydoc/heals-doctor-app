
interface NationalIDFormProps {
    onSubmit?: (e: any) => void;
    onCancel?: (e: any) => void;
}

const NationalIDForm = ({ onSubmit, onCancel }: NationalIDFormProps) => (
    <div>
        <form onSubmit={(e) => onSubmit && onSubmit(e)} >
            <div>
                <label>Identification Type</label>
                <select></select>
            </div>
            <div>
                <label>Identification Number</label>
                <input type="text" />
            </div>
            <div>
                <label>Front Image</label>
                <input type="file" />
            </div>
            <div>
                <label>Back Image</label>
                <input type="file" />
            </div>
            <button type="submit">OK</button> <button type="button" onClick={(e) => onCancel && onCancel(e)}>cancel</button>
        </form>
    </div>
)

export default NationalIDForm;
