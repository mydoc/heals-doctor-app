import React from 'react'
import { Wrapper } from './MenuButton.styles'


export interface MenuButtonProps {
    id?: string | undefined
    children: string | null;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    starticon?: JSX.Element;
    endicon?: JSX.Element;
}

const MenuButton = ({ id, children, onClick, starticon, endicon }: MenuButtonProps) => (
    <Wrapper id={id} onClick={onClick}>
        {starticon} <span>{children}</span> {endicon}
    </Wrapper>
)

export default MenuButton;
