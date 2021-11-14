import styled from 'styled-components';

export const ParticipantList = styled.div`

    .participant-card {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 10px;

        padding: 10px;

        .avatar {
            img {
                width: 35px;
                border-radius: 50%;
            }
        }

        .info {
            .name {
                font-weight: 600;
            }
        }

        :hover {
            background-color: #eee;
            border-radius: 5px;
        }

        .align-right {
            margin-left: auto;
        }
    }
`;

export const SelectedList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

