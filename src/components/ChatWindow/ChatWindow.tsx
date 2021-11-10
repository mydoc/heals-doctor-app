import { IconButton } from '@mui/material';
import { Wrapper, Content, ControlBar, InputWrapper } from './ChatWindow.stytes';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ImageIcon from '@mui/icons-material/Image';
import React, { useEffect, useRef, useState } from 'react';
import { Episode } from '../../interfaces';


const AlwaysScrollToHere = () => {
    const elementRef = useRef<any>();
    useEffect(() => { elementRef.current.scrollIntoView(); });
    return (
        <div ref={elementRef} />
    )
}

interface ChatWindowProps {
    episode: Episode | null;
    onSubmit: (msg: string) => void;
}

const ChatWindow = ({ episode, onSubmit }: ChatWindowProps) => {

    const [message, setMessage] = useState('');

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget.value);
    }

    const handleMessageSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onSubmit(message);
        setMessage('');
    }

    const getUserById = (id: number) => {
        return episode?.participants.find((p) => p.id === id);
    }

    return (
        <Wrapper>
            <Content>
                {episode?.messages?.map((msg, index) => {
                    const user = getUserById(msg.userId);
                    return (
                        <div key={index} className="message-row">
                            <div><img src={user?.imgUrl} alt={user?.name} /></div>
                            <div className="message">
                                <div className="meta">
                                    <span className="name">{user?.name}</span> <span className="datetime">{msg.datetime.toString()}</span>
                                </div>
                                <div className="text">{msg.message}</div>
                            </div>
                        </div>
                    )
                })}
                <AlwaysScrollToHere />
            </Content>
            <ControlBar onSubmit={handleMessageSubmit}>
                <InputWrapper>
                    <input type="text" name="message" value={message} onChange={handleMessageChange} autoComplete='off' />
                    <IconButton ><AttachmentIcon /></IconButton >
                    <IconButton ><KeyboardVoiceIcon /></IconButton >
                    <IconButton ><ImageIcon /></IconButton >
                </InputWrapper>
                <IconButton><SendIcon /></IconButton >
            </ControlBar>
        </Wrapper>
    )
}

export default ChatWindow;
