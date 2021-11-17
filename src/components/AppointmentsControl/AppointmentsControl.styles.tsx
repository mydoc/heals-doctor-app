import styled from 'styled-components';
import { AppointmentStatus } from '../../interfaces/episode';

export const Wrapper = styled.div <{ height: number}>`

    &.stack {

    }

    &.timeline {
        position: relative;
        height: ${props => `${props.height}px`};
        overflow: hidden;

        background: repeating-linear-gradient(
        #eee 0px,
        #eee 68px,
        #fff 68px,
        #fff 136px
        );
    }
`;

export const NowMarker = styled.div<{position: number}>`
    position: absolute;
    width: 100%;
    top: ${props => `${props.position}px`};
    height: 2px;
    background-color: #2885FF;
`

export const Card = styled.div<{ status: AppointmentStatus, start: number, duration: number}>`

    &.timeline {
        position: absolute;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.7);
        ${props => `height: ${props.duration}px; top: ${props.start}px;` };
        outline: 1px solid #ccc;
        width: 100%;
    }

    &.stacked {
        border-bottom: 1px solid #ccc;
    }

    padding: 10px;

    border-left: 8px solid ${(props) => {
        switch (props.status) {
            case AppointmentStatus.New: return 'yellow';
            case AppointmentStatus.Accepted: return 'green';
            case AppointmentStatus.Completed: return 'blue';
            case AppointmentStatus.Rejected: return 'grey';
            case AppointmentStatus.Timeout: return 'red';
        }
    }};

    .content {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 5px;

        .avatar {

            img {
                width: 35px;
                border-radius: 50%;
            }
        }

        .info {
            padding: 0 10px;

            .name {
                font-weight: 600;
            }

            .datetime {
                font-family: monospace;
            }
        }

        .menu {
            margin-left: auto;
        }
    }
`;
