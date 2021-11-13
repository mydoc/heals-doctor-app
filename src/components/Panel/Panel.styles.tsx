import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
    overflow: hidden;
`;

export const Content = styled.div`
    width: 100%;
    overflow-y: auto;
    overflow-wrap: break-word;
`;