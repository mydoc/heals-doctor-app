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

    .key-bar {
        background: #F1F3F4;
        color: #C80003;
        font-weight: 600;
        font-family: monospace;
        padding: 3px 6px;
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
