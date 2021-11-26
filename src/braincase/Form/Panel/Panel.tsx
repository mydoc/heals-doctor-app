import MenuBar from "../../../components/MenuBar/MenuBar";
import { Content, Wrapper } from "./Panel.styles";

interface PanelProps {
    anchor?: HTMLElement | null,
    children?: JSX.Element[],
    control?: JSX.Element
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
