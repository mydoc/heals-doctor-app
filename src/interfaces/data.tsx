import { IAppointment, IEpisode } from "./episode";
import { IProvider } from "./provider";
import { ICasenote, ICasenoteRevision, IIcd10, IMedicalCertificate, IPrescription, IReferral } from "./records";
import { IUser } from "./user";

export interface IDrug {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    dosage: string;
    route: string;
    frequency: string;
    cost: number;
    price: number;
}

export interface IDatabase {
    users: IUser[];
    providers: IProvider[];
    appointments: IAppointment[];
    episodes: IEpisode[];
    casenotes: ICasenote[];
    casenoteRevisions: ICasenoteRevision[],
    prescriptions: IPrescription[];
    referrals: IReferral[];
    medicalCertificates: IMedicalCertificate[];
    icd10: IIcd10[];
    drugBank: IDrug[]
}
