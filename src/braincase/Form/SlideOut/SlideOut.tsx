import { IconButton } from "@mui/material";
import { SlideOutWrapper, SlideOutBackground } from "./SlideOut.styles";
import CloseIcon from '@mui/icons-material/Close';

interface SlideOutProps {
    title?: string;
    open: boolean;
    onClose?: () => void;
    children?: JSX.Element | JSX.Element[] | string;
}

const SlideOut = ({title, open, onClose, children}: SlideOutProps) => (
    <>
    <SlideOutBackground open={open}>
    </SlideOutBackground>
    <SlideOutWrapper open={open}>
        <div className="header">
            <div className="title">{title}</div>
            <IconButton className="align-right" onClick={onClose}><CloseIcon /></IconButton>
        </div>
        <div className="content">
            {children}
        </div>
    </SlideOutWrapper>
    </>
)

export default SlideOut;