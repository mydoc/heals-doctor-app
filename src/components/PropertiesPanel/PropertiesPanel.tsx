import { Episode } from "../../interfaces";
import { Wrapper, Content } from "./PropertiesPanel.styles";
import InfoIcon from '@mui/icons-material/Info';
import MenuBar from "../MenuBar/MenuBar";
import MenuLabel from "../MenuLabel/MenuLabel";


interface PropertiesPanelProps {
    instance: Episode | null;
}

const PropertiesPanel = ({ instance }: PropertiesPanelProps) => {

    if (instance) {
        return (
            <Wrapper>
                <MenuBar><InfoIcon /><MenuLabel>Properties</MenuLabel></MenuBar>
                <Content>
                    <div>
                        <div className="key-bar">id</div>
                        <div className="value-area">{instance.id}</div>
                    </div>
                    <div>
                        <div className="key-bar">participants</div>
                        <div className="object-area">
                            {instance.participants.map(p => (
                                <><div className="object-table-key">{p.id}</div><div className="object-table-value">{p.name}</div></>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="key-bar">appointments</div>
                        <div className="object-area">
                            {instance.appointments.map(a => (
                                <><div className="object-table-key">{a.id}</div><div className="object-table-value">{`${a.startAt} - ${a.startAt} (${a.status})`}</div></>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="key-bar">provider</div>
                        <div className="object-area">
                            <div className="object-table-key">id</div><div className="object-table-value">{instance.provider.id}</div>
                            <div className="object-table-key">title</div><div className="object-table-value">{instance.provider.title}</div>
                            <div className="object-table-key">category</div><div className="object-table-value">{instance.provider.category}</div>
                        </div>
                    </div>
                </Content>
            </Wrapper>
        )
    } else {
        return <Wrapper>No Object Selected</Wrapper>
    }
}

export default PropertiesPanel;
