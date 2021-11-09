import { ReactElement } from "react";
import { Content, Slider, Wrapper } from "./MenuBar.styles";


interface MenuBarProps {
    children?: ReactElement | ReactElement[];
    anchor?: HTMLElement | null;
}

const MenuBar = ({ children = undefined, anchor = undefined } : MenuBarProps) => {

    return (
        <Wrapper>
            <Content>
                { children }
            </Content>
            <Slider anchor={anchor} />
        </Wrapper>
    )
}

export default MenuBar;

