import { Wrapper } from './MenuLabel.styles'

export interface MenuLabelProps {
    children: string | JSX.Element
}

const MenuLabel = ({ children }: MenuLabelProps) => (
    <Wrapper>
        <span>{children}</span>
    </Wrapper>
)


export default MenuLabel;
