import styled from 'styled-components';

export const Wrapper = styled.div`
    overflow: hidden;
`;

export const Content = styled.div`
    background-color: #4D6181;
`;

export const Card = styled.div`
    background-color: #fff;
    padding: 15px;
    margin: 0;
    margin-bottom: 1px;
    /* border-top: 1px solid #293A54;
    border-bottom: 1px solid #293A54; */

    div.portrait > img {
        border-radius: 50%;
        margin-bottom: 15px;
    }

    div.name {
        font-size: 2.2rem;
        font-weight: 600;
    }



    ul.dot-list {

        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0;

        li {
            list-style: none;

            &:after {
                content: "\\00B7";
                padding: 5px;
            }
        }
    }


    div.key-bar {
        font-size: 1.7rem;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    div.object-area {
        div.object-property {
            margin-bottom: 1rem;
            margin-left: 1.4rem;

            &.line {
                display: flex;
                flex: 1 1 auto;
                gap: 10px;

                div.object-table-value {
                    margin-left: auto;
                }
            }

            div.object-table-key {
                font-weight: 600;
                font-size: 1.4rem;
            }

            div.object-table-value {
                font-size: 1.4rem;
            }
        }
    }


`
