import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px;

    form {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;

        width: 100%;

        div.field {

            margin-bottom: 12px;

            label {
                display: inline-block;
                font-weight: 600;
                margin-bottom: 6px;
            }

            div.input {
                select, input {
                    width: 100%;
                    background-color: #F6F8FA;
                    border-radius: 6px;
                    padding: 5px 12px;
                    line-height: 20px;

                    border: 1px solid #D0D7DE;

                    outline-color: #0078D7;

                    &:focus {
                        background-color: transparent;
                    }
                }
            }
        }

        div.actions {
            display: flex;
            gap: 10px;

            button {
                font-weight: 600;

                background-color: #F6F8FA;
                border-radius: 6px;
                padding: 5px 16px;
                border: 1px solid #D0D7DE;
            }
        }
    }
`;
