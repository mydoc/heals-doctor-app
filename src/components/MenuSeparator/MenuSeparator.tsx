import styled from 'styled-components';

const MenuSeparator = styled.div`

    height: 100%;
    width: 1px;
    border-right: 1px solid #97A4B7;
    //border-left: 1px solid #97A4B7;
    padding: 0;

    :before {
        content: '';
        display: inline-block;
        height: 100%;
    }
`;

export default MenuSeparator;
