import React, { useState } from 'react';
import { Wrapper } from './ChatPanel.styles'
import MenuBar from '../MenuBar/MenuBar';
import ChatIcon from '@mui/icons-material/Chat';
import MenuLabel from '../MenuLabel/MenuLabel';
import ChatWindow from '../ChatWindow/ChatWindow';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Episode } from '../../interfaces';

interface ChatPanelProps {
    episode: Episode | null;
    onSendMessage: (e: string) => void;
}

const ChatPanel = ({ episode, onSendMessage }: ChatPanelProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    return (
        <Wrapper>
            <MenuBar anchor={anchor}>
                <ChatIcon />
                <MenuLabel>Jake See</MenuLabel>
                <MenuSeparator />
                <MenuLabel>{ episode ? episode.provider.title : '' }</MenuLabel>
                <div className="align-right"><IconButton id="expand-menu" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
            </MenuBar>
            <Menu id="file-button" anchorEl={anchor} open={anchor?.id === "expand-menu"} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => { }}>Add Participant</MenuItem>
                <Divider />
                <MenuItem onClick={() => { }}>Group Referral</MenuItem>
                <MenuItem onClick={() => { }}>Direct Referral</MenuItem>
            </Menu>
            <ChatWindow episode={episode} onSubmit={ (message) => onSendMessage(message) } />
        </Wrapper>
    )
}

export default ChatPanel;
