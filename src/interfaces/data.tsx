import { IAppointment, IEpisode } from "./episode";
import { IProvider } from "./provider";
import { IUser } from "./user";

export interface IDatabase {
    users: IUser[];
    providers: IProvider[];
    appointments: IAppointment[];
    episodes: IEpisode[];
}
