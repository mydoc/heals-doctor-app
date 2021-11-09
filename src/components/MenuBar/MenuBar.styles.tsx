import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: var(--headerHeight);
    align-items: center;
    justify-content: start;
    background-color: var(--lightGrey);
    border-bottom: 1px solid var(--lightGrey);

    position: relative;

    * {
        flex-shrink: 0;
    }
`;

export const Content = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: start;
    gap: 10px;
    padding: 0 20px;

    .align-right {
        margin-left: auto;
    }
`;

export const Slider = styled.div<{ anchor?: HTMLElement | null }>`
    position: absolute;
    bottom: 0;
    height: 5px;

    background-color: #106EBE;
    z-index: 999;

    left: ${props => props.anchor ? props.anchor.offsetLeft : '0'}px;
    width: ${props => props.anchor ? props.anchor.offsetWidth : '0'}px;

    transition: all 0.15s ease-out;
`

