import { User, UserRole } from "../../interfaces/user";
import { Card, Content, Wrapper } from "./PatientCardControl.styles";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import SlideOut from "../../braincase/Form/SlideOut/SlideOut";
import { useState } from "react";
import NationalIdForm from "../Form/NationalIdForm";
import MedicalConditionForm from "../Form/MedicalConditionForm";

interface PatientCardControlProps {
    patient: User;
}

const PatientCardControl = ({ patient }: PatientCardControlProps) => {

    const [editForm, setEditForm] = useState<null | 'Edit Identification' | 'Edit Medical Condition'>(null);

    const isEditFormOpened = Boolean(editForm);

    const getEditForm = (): JSX.Element => {
        switch (editForm) {
            case 'Edit Identification':
                return <NationalIdForm patient={patient} onSubmit={() => setEditForm(null)} onCancel={() => setEditForm(null)} />
            case 'Edit Medical Condition':
                return <MedicalConditionForm patient={patient} onSubmit={() => setEditForm(null)} onCancel={() => setEditForm(null)} />
            default:
                return <></>
        }
    }


    if(!patient) return <Wrapper>No Patient Selected</Wrapper>

    return (
        <Wrapper>
            <Content>
                <Card>
                    <div className="portrait"><img src={patient.imgUrl} alt={patient.name} /></div>
                    <div className="name">{patient.name}</div>
                    <ul className="dot-list">
                        <li>{UserRole[patient.role]}</li>
                        <li>{patient.id}</li>
                        <li>{patient.gender}</li>
                        <li>{patient.birthdate.toDateString()}</li>
                    </ul>
                </Card>
                <Card>
                    <div className="key-bar">
                        National Identity
                        <IconButton className="icon-button" onClick={() => setEditForm('Edit Identification')}><EditIcon className="icon"/></IconButton>
                    </div>
                    <div className="object-area">
                        <div className="object-property line"><div className="object-table-key">Number</div><div className="object-table-value">{patient.nationalId}</div></div>
                        <div className="object-property line"><div className="object-table-key">Image</div><div className="object-table-value">{patient.nationalId}</div></div>
                    </div>
                </Card>
                <Card>
                    <div className="key-bar">
                        Medical Conditions
                        <IconButton className="icon-button" onClick={() => setEditForm('Edit Medical Condition')}><EditIcon className="icon" /></IconButton></div>
                    <div className="object-area">
                        <div className="object-property"><div className="object-table-key">Conditions</div><div className="object-table-value">{patient.conditions}</div></div>
                        <div className="object-property"><div className="object-table-key">Medications</div><div className="object-table-value">{patient.medications}</div></div>
                        <div className="object-property"><div className="object-table-key">Allergy</div><div className="object-table-value">{patient.allergy}</div></div>
                    </div>
                </Card>
                <Card>
                    <div className="key-bar">Contact</div>
                    <div className="object-area">
                        <div className="object-property line"><div className="object-table-key">Email</div><div className="object-table-value">{patient.contact}</div></div>
                        <div className="object-property line"><div className="object-table-key">Phone</div><div className="object-table-value">{patient.email}</div></div>
                        <div className="object-property line"><div className="object-table-key">Emergency Person</div><div className="object-table-value">{patient.emergencyPerson}</div></div>
                        <div className="object-property line"><div className="object-table-key">Emergency Contact</div><div className="object-table-value">{patient.emergencyContact}</div></div>
                    </div>
                </Card>
                <Card>
                    <div className="key-bar">
                        Address
                        <IconButton className="icon-button"><EditIcon className="icon" /></IconButton>
                    </div>
                    <div className="object-area">
                        <div className="object-property line"><div className="object-table-key">Country</div><div className="object-table-value">{patient.country}</div></div>
                        <div className="object-property line"><div className="object-table-key">City</div><div className="object-table-value">{patient.city}</div></div>
                        <div className="object-property line"><div className="object-table-key">Street</div><div className="object-table-value">{patient.street}</div></div>
                        <div className="object-property line"><div className="object-table-key">Postal</div><div className="object-table-value">{patient.postal}</div></div>
                    </div>
                </Card>
            </Content>
            <SlideOut title={editForm ?? ''} open={isEditFormOpened} onClose={() => { setEditForm(null) }}>
                {getEditForm()}
            </SlideOut>
        </Wrapper>
    )
}

export default PatientCardControl;
