import styled from 'styled-components';

export const Wrapper = styled.div`
    /* display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
    overflow: hidden; */
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

