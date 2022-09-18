import React, { ReactNode } from "react";
import { Content, Slider, Wrapper } from "./MenuBar.styles";


interface MenuBarProps {
    children?: ReactNode;
    anchor?: HTMLElement | null;
    style?: React.CSSProperties
}

const MenuBar = ({ children = undefined, anchor = undefined, style } : MenuBarProps) => {

    return (
        <Wrapper style={style}>
            <Content>
                { children }
            </Content>
            <Slider anchor={anchor} />
        </Wrapper>
    )
}

export default MenuBar;

