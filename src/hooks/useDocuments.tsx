import { useContext } from "react";
import { DataContext, IDataContext } from '../contexts/DataContext';
import { Episode } from "../interfaces/episode";


const useDocuments = (episode: Episode) => {

    const { data } = useContext<IDataContext>(DataContext);

    return [];
}

export default useDocuments;
