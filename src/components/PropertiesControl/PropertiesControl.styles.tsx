import styled from 'styled-components';

export const Wrapper = styled.div`
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