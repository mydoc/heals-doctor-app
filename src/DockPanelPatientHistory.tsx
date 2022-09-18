import { useState } from 'react';
import styled from 'styled-components';
import { FaFilePrescription } from 'react-icons/fa';
import { FaFolder } from 'react-icons/fa';
import { ImLab } from 'react-icons/im';
import { AiFillFile } from 'react-icons/ai';
import { BsFillChatFill } from 'react-icons/bs';
import { User } from './interfaces/user';
import PatientControl from './components/PatientControl/PatientControl';

const Wrapper = styled.div`
    height: 300px;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: min-content 1fr;
`

const Content = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;

    height: 100%;
`

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
`


interface DockPanelPatientHistoryProps {
    patient: User
}

export const DockPanelPatientHistory = ({patient}: DockPanelPatientHistoryProps) => {

    const [current, setCurrent] = useState('casenote');

    return <Wrapper>
        <Nav>
            <button className={current == 'casenote' ? 'current' : undefined} onClick={() => setCurrent('casenote')}><FaFolder style={{ fontSize: '1.6rem', cursor: 'pointer' }} /></button>
            <button className={current == 'rx' ? 'current' : undefined} onClick={() => setCurrent('rx')}><FaFilePrescription style={{ fontSize: '1.6rem', cursor: 'pointer' }} /></button>
            <button className={current == 'lab' ? 'current' : undefined} onClick={() => setCurrent('lab')}><ImLab style={{ fontSize: '1.6rem', cursor: 'pointer' }} /></button>
            <button className={current == 'file' ? 'current' : undefined} onClick={() => setCurrent('file')}><AiFillFile style={{ fontSize: '1.6rem', cursor: 'pointer' }} /></button>
            <button className={current == 'chat' ? 'current' : undefined} onClick={() => setCurrent('chat')}><BsFillChatFill style={{ fontSize: '1.6rem', cursor: 'pointer' }} /></button>
        </Nav>
        <PatientControl patient={patient} />
    </Wrapper>
}
