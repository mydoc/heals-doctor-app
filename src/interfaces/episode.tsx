import { IProvider } from "./provider";
import { IUser, User } from "./user";

export enum MessageType {
    Appointment = 1,
    JSON = 2,
    Laboratory = 3,
    Message = 4,
    Referral = 5
}

export interface IMessage {
    userId: number;
    message: string;
    datetime: Date;
    type: MessageType;
}

export enum EpisodeStatus {
    Opened = 'Opened',
    Closed = 'Closed'
}

export enum EpisodeType {
    BotConvo = 1, // - Bot to Patient(default episode for each patient)
    CallCentre = 2, // - Concierge to Patient
    Diary = 3, // Patient to Professional
    Group = 4, // concierge to Professional
    HealthScreening = 5, // - Healthscreening episode to Patient
    PeerToPeer = 6, // - Professional to Professional
}

export interface IEpisode {
    id: number;
    participants: IUser[];
    providerId: number;
    messages: IMessage[];
    status: EpisodeStatus,
    type: EpisodeType
}

export interface IAppointment {
    id: number;
    episodeId: number;
    startAt: Date;
    endAt: Date;
    status: AppointmentStatus,
}

export class Episode implements IEpisode {

    id: number;
    providerId: number;
    status: EpisodeStatus;
    type: EpisodeType;

    constructor(episode: IEpisode,
        public appointments: IAppointment[],
        public provider: IProvider,
        public messages: Message[],
        public participants: User[]
    ) {
        this.id = episode.id;;
        this.providerId = episode.providerId;
        this.status = episode.status;
        this.type = episode.type;
    }


}

export class Message implements IMessage {
    userId: number;
    message: string;
    datetime: Date;
    type: MessageType;

    constructor(template: IMessage, public user: User) {
        this.userId = template.userId;
        this.message = template.message;
        this.datetime = template.datetime;
        this.type = template.type;
    }

}

export enum AppointmentStatus {
    Open = 'Open',
    Closed = 'Closed'
}
