import styled from 'styled-components';

export const Wrapper = styled.div``;

export const Header = styled.div`
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    padding: 4px 6px;
    background-color: #eeeeee;

    .icon {
        margin-left: auto;
    }
`;

export const Content = styled.div``;

export const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    padding: 4px 6px;
    border-bottom: 1px solid #eee;

    .icon {
        margin-left: auto;
    }
`;
