import { Appointment } from "../../interfaces/episode";
import { Card, NowMarker, Wrapper } from "./AppointmentsControl.styles";
import { format } from 'date-fns';
import VideocamIcon from '@mui/icons-material/Videocam';
import { IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface AppointmentsControlProps {
    sortedAppointments: Appointment[] | null;
    view: 'stacked' | 'timeline';
}

const AppointmentsControl = ({ sortedAppointments, view }: AppointmentsControlProps) => {

    const hasSortedAppointments = (sortedAppointments && sortedAppointments.length > 0);
    const min15 = 15 * 60 * 1000;
    const scalefactor = 1 / 13235.294117647058823529411764706; // scale y-coordinate so that 15 mins = 68px with absolute positioning
    const origin = hasSortedAppointments ? Math.floor(sortedAppointments[0].startAt.getTime() / min15) * min15 : 0;
    const timelineHeight = hasSortedAppointments ? (sortedAppointments[sortedAppointments.length - 1].endAt.getTime() - origin) * scalefactor : 0;
    const nowMarkerPos = (Date.now() - origin) * scalefactor;

    const onPositioning = (appointment: Appointment): { start: number, duration: number } => {
        if (sortedAppointments) {
            const start = (appointment.startAt.getTime() - origin) * scalefactor;
            const duration = (appointment.endAt.getTime() - appointment.startAt.getTime()) * scalefactor;
            return { start, duration }
        } else {
            return { start: 0, duration: 0 }
        }
    }

    const getWrapperStyle = (view: 'stacked' | 'timeline', height: number) => {
        if (view == 'timeline') {
            return { height: `${height}px` };
        }
    }

    const getStyleNowMarker = (view: 'stacked' | 'timeline', position: number) => {
        if (view === 'stacked') {
            return { display: 'none' as 'none' };
        } else {
            return {
                position: 'absolute' as 'absolute',
                width: '100%',
                top: `${position}px`,
                height: '2px',
                backgroundColor: '#2885FF',
            }
        }
    }

    return (
        <Wrapper style={getWrapperStyle(view, timelineHeight)} className={view}>
            {sortedAppointments?.map(appt => {
                const { start, duration } = onPositioning(appt);
                return (
                    <Card key={appt.id} status={appt.status} start={start} duration={duration} className={view}>
                        <div className="content">
                            <div className="avatar"><img src={appt.patient?.imgUrl} alt={appt.patient?.firstName} /></div>
                            <div className="info">
                                <div className="name">{appt.patient?.name}</div>
                                <div className="datetime">{`${format(appt.startAt, 'HH:mm')} - ${format(appt.endAt, 'HH:mm')}`}</div>
                                <div className="datetime">{format(appt.startAt, 'dd MMM yy')}</div>
                            </div>
                            <div className="action">
                                <IconButton><VideocamIcon /></IconButton>
                            </div>
                            <div className="menu">
                                <IconButton><MoreVertIcon /></IconButton>
                            </div>
                        </div>
                    </Card>
                )
            })}
            <NowMarker style={getStyleNowMarker(view, nowMarkerPos)} className="dsad" />
        </Wrapper>
    );
}

export default AppointmentsControl;
