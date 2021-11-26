import { useState } from 'react';

import { IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { Content, Item, Wrapper, Header } from './StackListControl.styles';

interface StackListControlProps {
    initialItems: any[],
    onSelect: (item: any) => void,
    onGetChildren: (item: any | null) => any[],
    onRenderItem: (item: any) => string | JSX.Element,
    onRenderPath: (item: any[]) => string | JSX.Element,
    onHasChildren: (item: any) => boolean,
    onIsSelected: (item: any) => boolean,
}

const StackListControl = ({ initialItems, onGetChildren, onSelect, onRenderItem, onRenderPath, onHasChildren, onIsSelected }: StackListControlProps) => {

    const [items, setItems] = useState(initialItems);
    const [path, setPath] = useState<any[]>([]);

    const _onExpand = (item: any) => {
        setPath(prev => [...prev, item]);
        setItems(onGetChildren(item));
    }

    const _onCollapse = () => {
        setPath(prev => {
            prev.pop();
            return [...prev];
        });
        setItems(onGetChildren(path[path.length - 1]));

    }

    const isRoot = Boolean(path[path.length - 1]);

    return (
        <Wrapper>
            <Content>
                {isRoot && (
                    <Header>
                        <div>{onRenderPath(path)}</div>
                        <div className="icon"><IconButton onClick={() => _onCollapse()}><ChevronLeftIcon /></IconButton></div>
                    </Header>
                )}
                {items.map((i, index) => (
                    <Item key={index}>
                        <div>{onRenderItem(i)}</div>
                        <div className="icon">
                            {onHasChildren(i) ?
                                (<IconButton onClick={() => _onExpand(i)}><ChevronRightIcon /></IconButton>) :
                                onIsSelected(i) ? (<IconButton><CheckIcon /></IconButton>) : (<IconButton onClick={() => onSelect(i)}><AddIcon /></IconButton>)
                            }
                        </div>
                    </Item>
                ))}
            </Content>
        </Wrapper>
    )
}

export default StackListControl;
