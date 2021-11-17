import React, { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import MenuLabel from '../MenuLabel/MenuLabel';
import ChatControl from '../ChatControl/ChatControl';
import MenuSeparator from '../MenuSeparator/MenuSeparator';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { User, UserRole } from '../../interfaces/user';
import Panel from '../Panel/Panel';
import { Episode } from '../../interfaces/episode';

interface ChatPanelProps {
    episode: Episode | null;
    onSendMessage: (e: string) => void;
}

const ChatPanel = ({ episode, onSendMessage }: ChatPanelProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const getPatient = (): User | null => {
        return episode?.participants.find(p => p.role === UserRole.patient) ?? null;
    }

    return (
        <Panel
            control={<ChatControl episode={episode} onSubmit={ (message) => onSendMessage(message) } />}
        >
            <ChatIcon />
            <MenuLabel>{getPatient()?.name ?? '<No Patient>'}</MenuLabel>
            <MenuSeparator />
            <MenuLabel>{ episode ? episode.provider.title : '' }</MenuLabel>
            <div className="align-right"><IconButton id="expand-menu" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
            <Menu id="file-button" anchorEl={anchor} open={anchor?.id === "expand-menu"} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => { }}>Add Participant</MenuItem>
                <Divider />
                <MenuItem onClick={() => { }}>Group Referral</MenuItem>
                <MenuItem onClick={() => { }}>Direct Referral</MenuItem>
                <Divider />
                <MenuItem onClick={() => { }}>Leave Chat</MenuItem>
            </Menu>
        </Panel>
    )
}

export default ChatPanel;
