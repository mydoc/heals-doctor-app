import styled from 'styled-components';

export const Wrapper = styled.div`
    overflow: hidden;
`;

export const Content = styled.div`
    .key-bar {

        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        background: #F1F3F4;
        padding: 3px 6px;

        color: #C80003;
        font-weight: 600;
        font-family: monospace;

        span {
            color: #C80003;
            font-weight: 600;
            font-family: monospace;
        }

        .icon-button {
            margin-left: auto;

            width: 22px;
            height: 22px;
            border-radius: 5px;

            .icon {
                width: 18px;
            }
        }
    }

    .value-area {
        padding: 6px;
    }

    .object-area {
        display: grid;
        grid-template-columns: min-content 1fr;

        div {
            border-bottom: 1px solid #eee;
            padding: 2px 6px;
        }

        div.object-table-key {
            font-family: monospace;
            border-right: 1px solid #eee;
        }
    }
`;
