import styled from 'styled-components'

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr min-content;

    height: 100%;
    overflow: hidden;
`;

export const Content = styled.div`
    height: 100%;
    padding: 10px;
    overflow-y: scroll;
    overflow-x: hidden;

    .message-row{

        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;

        margin-bottom: 24px;

        img {
            width: 50px;
            border-radius: 50%;
        }

        .message {

            .meta {
                margin-bottom: 5px;

                .name { font-weight: 600; }
                .datetime { font-size: 0.8rem; }
            }

            .text {

            }
        }
    }


`;

export const ControlBar = styled.form`
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    button {
        flex-basis: auto;
    }
`;

export const InputWrapper = styled.div`
    flex: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10;

    background: #F5F6F7;
    border-radius: 20px;
    padding: 0 10px;

    input {

        background: transparent;
        border: none;
        outline: none;

        flex: auto;
        width: 100%;
        padding: 6px;
    }

`
