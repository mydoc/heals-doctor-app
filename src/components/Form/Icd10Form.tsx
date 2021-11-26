import { useContext } from "react";
import StackListControl from "../../braincase/Form/StackListControl/StackListControl";
import { DataContext, IDataContext } from "../../contexts/DataContext";
import { IIcd10 } from "../../interfaces/records";


interface Icd10FormProps {
    selectedItems: IIcd10[];
    onSelectItem: (item: IIcd10) => void;
}

const Icd10Form = ({ selectedItems, onSelectItem }: Icd10FormProps) => {

    const { data } = useContext<IDataContext>(DataContext);

    const initialItems = data.icd10.filter(code => code.parentId === 0);

    const onGetChildren = (item: IIcd10): IIcd10[] => {

        if (!Boolean(item)) return initialItems;
        return data.icd10.filter(code => code.parentId === item.id);
    }

    const onSelect = (item: IIcd10) => {
        onSelectItem(item);
    }

    const onRenderItem = (item: IIcd10) => {
        return `${item.code} ${item.desc}`;
    }

    const onRenderPath = (items: IIcd10[]) => {
        const path = items.map(item => item.code).join(' / ');
        return `${path} ${items[items.length - 1].desc}`;
    }

    const onIsSelected = (item: IIcd10) => {
        return selectedItems.includes(item);
    }

    const onHasChildren = (item: IIcd10) => {
        return data.icd10.findIndex(code => code.parentId === item.id) >= 0
    }

    return (
        <StackListControl
            initialItems={initialItems}
            onSelect={onSelect}
            onRenderItem={onRenderItem}
            onRenderPath={onRenderPath}
            onGetChildren={onGetChildren}
            onHasChildren={onHasChildren}
            onIsSelected={onIsSelected}
        />
    )
}

export default Icd10Form;
