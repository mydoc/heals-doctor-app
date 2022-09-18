import { ReactNode } from "react";
import MenuBar from "../../../components/MenuBar/MenuBar";
import { Content, Wrapper } from "./Panel.styles";

interface PanelProps {
    anchor?: HTMLElement | null,
    children?: ReactNode,
    control?: ReactNode
}

const Panel = ({anchor, children, control}: PanelProps) => (
    <Wrapper>
        <MenuBar anchor={anchor}>
            {children}
        </MenuBar>
        <Content>
            {control}
        </Content>
    </Wrapper>
);

export default Panel;
