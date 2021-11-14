import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MenuLabel from "../MenuLabel/MenuLabel";
import { useContext, useState } from "react";

// icons
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { DataContext } from '../../contexts/DataContext';
import { Episode, EpisodeStatus, UserRole } from "../../interfaces";
import { Check } from "@mui/icons-material";
import Panel from "../Panel/Panel";
import ChatListControl from "../ChatListControl/ChatListControl";

import { Database } from '../../Database';
import StartChatDialog from "../StartChatDialog/StartChatDialog";


interface EpisodesPanelProp {
    episodes: Episode[];
    activeEpisode: Episode | null;
    onActivateChatCard: (e: Episode) => void;
}

const EpisodesPanel = ({ episodes, onActivateChatCard, activeEpisode }: EpisodesPanelProp) => {

    const { session } = useContext(DataContext);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [filter, setFilter] = useState<'All' | 'Opened' | 'Closed'>('All');
    const [showNewChatDialog, setShowNewChatDialog] = useState(false);

    const isMenuOpened = Boolean(anchor);

    const getFilteredEpisodes = (): Episode[] => {
        if (filter === 'Closed') return episodes.filter(e => e.status === EpisodeStatus.Closed);
        else if (filter === 'Opened') return episodes.filter(e => e.status === EpisodeStatus.Opened);
        else return episodes;
    }

    const onNewChatEpisode = () => {
        setAnchor(null);
        setShowNewChatDialog(true);
    }

    return (
        <Panel control={<ChatListControl episodes={getFilteredEpisodes()} session={session} activeEpisode={activeEpisode} onSelect={onActivateChatCard}/>}>
            <ChatIcon />
            <MenuLabel>{`${filter} Episodes (${getFilteredEpisodes().length})`}</MenuLabel>
            <div className="align-right"><IconButton id="expand-menu-chat" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
            <Menu anchorEl={anchor} open={isMenuOpened} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => setFilter('All')}>{filter === 'All' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={filter !== 'All'}>All</ListItemText></MenuItem>
                <MenuItem onClick={() => setFilter('Opened')}>{filter === 'Opened' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={filter !== 'Opened'}>Opened</ListItemText></MenuItem>
                <MenuItem onClick={() => setFilter('Closed')}>{filter === 'Closed' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={filter !== 'Closed'}>Closed</ListItemText></MenuItem>
                <Divider />
                <MenuItem onClick={onNewChatEpisode}>Start Chat Episode...</MenuItem>
                <Divider />
                <MenuItem onClick={() => { }}>Search Episodes</MenuItem>
            </Menu>
            <StartChatDialog
                open={showNewChatDialog}
                onClose={() => setShowNewChatDialog(false)}
                participants={Database.users.filter(u => u.role === UserRole.doctor)} />
        </Panel>
    )
}

export default EpisodesPanel;
