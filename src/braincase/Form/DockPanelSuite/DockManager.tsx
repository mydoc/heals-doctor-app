import { ReactNode } from 'react';
import styled from 'styled-components';
import { CDockForm, CDockLayoutItem, DockLayoutDirection } from './hooks';
import DockLayout from './DockLayout';

export const Wrapper = styled.div`

    --backgroundColor: #35496A;
    --systemColor: #E8E8EC;

    background-color: var(--backgroundColor);

    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const DockManager = ({ layout, onStacking, onSplitting, onRenderForm }
    : {
        layout: CDockLayoutItem,
        onStacking: (sourceId: string, destinationId: string) => boolean,
        onSplitting: (sourceId: string, destinationId: string, direction: DockLayoutDirection) => boolean,
        onRenderForm: (form: CDockForm) => ReactNode
    }) => {

    return (
        <Wrapper className="dock-manager">
            <DockLayout layout={layout} onStacking={onStacking} onSplitting={onSplitting} onRenderForm={onRenderForm} />
        </Wrapper>
    )
}

export default DockManager;

