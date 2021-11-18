import { createContext, useState } from "react";
import { Database } from "../Database";
import { IDatabase } from "../interfaces/data";
import { IUser } from "../interfaces/user";


export interface IDataContext {
    data: IDatabase;
    session: IUser | null;
    setSession: React.Dispatch<React.SetStateAction<IUser | null>>;
    setData: React.Dispatch<React.SetStateAction<IDatabase>>;
}

export const DataContext = createContext<IDataContext>({ data: Database, session: null, setSession: () => { }, setData: () => { } });

interface DataProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const DataProvider = ({ children }: DataProviderProps) => {

    const [data, setData] = useState<IDatabase>(Database);
    const [session, setSession] = useState<IUser | null>(null);

    return (
        <DataContext.Provider value={{data, setData, session, setSession}}>
            { children }
        </DataContext.Provider>
    )
}
