import React from "react";
import { Episode } from "../../interfaces";
import { Wrapper } from "./PropertiesControl.styles"

interface PropertiesControlProp {
    instance: Episode | null;
}

const PropertiesControl = ({instance} : PropertiesControlProp) => {
    
    if(instance) return (
        <Wrapper>
        <div>
            <div className="key-bar">id</div>
            <div className="value-area">{instance.id}</div>
        </div>
        <div>
            <div className="key-bar">status</div>
            <div className="value-area">{instance.status}</div>
        </div>
        <div>
            <div className="key-bar">participants</div>
            <div className="object-area">
                {instance.participants.map(p => (
                    <React.Fragment key={p.id}><div className="object-table-key">{p.id}</div><div className="object-table-value">{p.name}</div></React.Fragment>
                ))}
            </div>
        </div>
        <div>
            <div className="key-bar">appointments</div>
            <div className="object-area">
                {instance.appointments.map(a => (
                    <React.Fragment key={a.id}><div className="object-table-key">{a.id}</div><div className="object-table-value">{`${a.startAt} - ${a.startAt} (${a.status})`}</div></React.Fragment>
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
        </Wrapper>
    )

    return <Wrapper>No Episode Selected</Wrapper>
}

export default PropertiesControl;