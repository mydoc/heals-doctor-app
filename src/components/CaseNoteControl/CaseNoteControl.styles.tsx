import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
    overflow: hidden;

    position: relative;
`;

export const Content = styled.div`
    padding: 10px;
    overflow-y: auto;

    .casenote-form {

        .input-field {
            width: 100%;

            border: 1px solid #efefef;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 10px;

            display: grid;

            .radio-group {
                display: flex;
                gap: 20px;
            }

            label {
                margin-bottom: 10px;
                font-weight: 600;
                color: #888888;
            }

            textarea {
                width: 100%;
                min-height: 100px;
                border: 1px solid #888888;
            }
        }
    }
`;

export const SlideOutWrapper = styled.div <{ open: boolean }>`
    position: absolute;
    background: rgba(0, 0, 0, ${ props => props.open ? `0.5` : `0`});
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: ${ props => props.open ? `initial` : `-1`};

    transition: background 0.25s ease-out;
`

export const SlideOut = styled.div <{ open: boolean }>`
    position: absolute;
    background-color: #CFD7E5;

    border-radius: 20px 20px 0 0;

    left: 0;
    right: 0;
    bottom: 0;
    top: ${ props => props.open ? `5%` : `100%`};

    transition: all 0.25s ease-out;

    .header {
        display: flex;
        padding: 5px;
        .align-right {
            margin-left: auto;
        }
    }

    .content {
        padding: 10px;
        background-color: white;
        height: 100%;
        overflow-y: auto;
    }
`
