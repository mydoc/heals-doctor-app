import Splitter from "../../braincase/Form/Splitter/Splitter";
import { User } from "../../interfaces/user";
import Generator from '../../utils/Generator';
import CasenoteControl from "../CasenoteControl/CasenoteControl";
import CasenoteForm from "../Form/CasenoteForm/CasenoteForm";
import { Content, Wrapper } from './CartControl.styles';


interface CartControlProps {
    patient: User
}

const CartControl = ({ patient }: CartControlProps) => (
    <Wrapper>

    </Wrapper>
)


export default CartControl;
