import styled from 'styled-components';

export const Icd10Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    padding: 2px 3px;
    border-top: 1px solid #eee;

    div {
        font-size: var(--fontTiny);
    }

    .icon {
        margin-left: auto;
    }
`;
