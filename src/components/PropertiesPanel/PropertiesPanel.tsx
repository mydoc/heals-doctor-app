import { Episode } from "../../interfaces";
import InfoIcon from '@mui/icons-material/Info';
import MenuLabel from "../MenuLabel/MenuLabel";
import Panel from "../Panel/Panel";
import PropertiesControl from "../PropertiesControl/PropertiesControl";


interface PropertiesPanelProps {
    instance: Episode | null;
}

const PropertiesPanel = ({ instance }: PropertiesPanelProps) => (

    <Panel control={<PropertiesControl instance={instance}/>}><InfoIcon /><MenuLabel>Properties</MenuLabel></Panel>
)

export default PropertiesPanel;
