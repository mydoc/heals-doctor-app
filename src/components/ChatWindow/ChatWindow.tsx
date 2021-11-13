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
        if (message !== '') {
            onSubmit(message);
            setMessage('');
        }
    }

    return (
        <Wrapper>
            <Content>
                {episode?.messages?.map((m, index) => {
                    return (
                        <div key={index} className="message-row">
                            <div><img src={m.user.imgUrl} alt={m.user.name} /></div>
                            <div className="message">
                                <div className="meta">
                                    <span className="name">{m.user.name}</span> <span className="datetime">{m.datetime.toString()}</span>
                                </div>
                                <div className="text">{m.message}</div>
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
