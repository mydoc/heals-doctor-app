import { IconButton } from '@mui/material';
import { Wrapper, FaceImages, Menu, Content, Info } from './ChatCard.styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IUser, Episode } from '../../interfaces';


interface ChatCardProps {
    episode: Episode;
    session: IUser;
    onClick: (e: Episode) => void;
    isActive?: boolean;
}

const ChatCard = ({ episode, session, onClick, isActive }: ChatCardProps) => {

    const { participants, messages } = episode;

    const faces = participants.filter((p) => p.id !== session.id);
    const lastMsg = messages ? messages[messages.length - 1] : null;

    return (
        <Wrapper>
            <Content className={isActive ? 'isActive' : ''}>
                <FaceImages>
                    <img src={faces[0].imgUrl} alt={ faces[0].name }/>
                </FaceImages>
                <Info>
                    <div className="container" onClick={ () => onClick(episode) }>
                        <div>{faces.map((p, i) => (<span key={i}>{ p.name }</span>))}</div>
                        <div>{lastMsg && `${lastMsg.userId}: ${lastMsg.message}`}</div>
                    </div>
                </Info>
                <Menu>
                    <IconButton><MoreVertIcon /></IconButton>
                </Menu>
            </Content>
        </Wrapper>
    )
}

export default ChatCard;
