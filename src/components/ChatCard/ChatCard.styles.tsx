import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    padding: 10px 10px 10px 0;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
`;

export const Content = styled.div`
    display: flex;
    padding: 10px;
    border-radius: 0 50px 50px 0;
    width: 100%;
    align-items: center;
    justify-content: start;
    gap: 5px;

    :hover, &.isActive {
        background-color: pink;
        cursor: pointer;
    }
`;

export const FaceImages = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 35px;
        border-radius: 50%;
    }
`;

export const Info = styled.div`
    overflow: hidden;
    padding: 5px 10px;

    div {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        span {
            font-weight: 600;
        }

        span::after {
            content: ", ";
        }
        span:last-child::after {
            content: ""
        }
    }
`;

export const Menu = styled.div`
    margin-left: auto;
`;
