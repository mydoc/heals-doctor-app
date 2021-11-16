import styled from 'styled-components';

export const SlideOutBackground = styled.div <{ open: boolean }>`
    position: absolute;
    background: #000;
    opacity: ${ props => props.open ? `0.5` : `0`};
    top: ${ props => props.open ? `0` : `100%`};
    bottom: 0;
    right: 0;
    left: 0;

    transition: ${ props => props.open ? `top 0s, opacity 0.225s ease-out` : `opacity 0.225s ease-out, top 0s 0.225s`};
`

export const SlideOutWrapper = styled.div <{ open: boolean }>`
    position: absolute;
    background-color: #CFD7E5;
    
    display: grid;
    grid-template-rows: min-content 1fr;

    border-radius: 10px 10px 0 0;

    left: 0;
    right: 0;
    bottom: 0;
    top: ${ props => props.open ? `20px` : `100%`};

    transition: all 0.25s ease-out;

    .header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        padding: 0 10px;

        .title {
            font-weight: 600;
        }

        .align-right {
            margin-left: auto;
        }
    }

    .content {
        background-color: white;
        height: 100%;
        overflow-y: auto;
    }
`
