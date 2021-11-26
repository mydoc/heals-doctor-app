import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import MenuLabel from "../MenuLabel/MenuLabel";
import { useContext, useState } from "react";

// icons
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { DataContext } from '../../contexts/DataContext';
import { Check } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Panel from "../../braincase/Form/Panel/Panel";
import ChatListControl from "../ChatListControl/ChatListControl";

import { Database } from '../../Database';
import StartChatDialog from "../StartChatDialog/StartChatDialog";
import { Episode, EpisodeStatus, EpisodeType } from "../../interfaces/episode";
import { UserRole } from "../../interfaces/user";


interface EpisodesPanelProp {
    episodes: Episode[];
    activeEpisode: Episode | null;
    onActivateChatCard: (e: Episode) => void;
}

const EpisodesPanel = ({ episodes, onActivateChatCard, activeEpisode }: EpisodesPanelProp) => {

    const { session } = useContext(DataContext);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [statusFilter, setStatusFilter] = useState<'All' | 'Opened' | 'Closed'>('Opened');
    const [typeFilter, setTypeFilter] = useState<EpisodeType[]>([
        EpisodeType.PeerToPeer,
        EpisodeType.Group,
        EpisodeType.Diary,
        EpisodeType.HealthScreening
    ]);
    const [showNewChatDialog, setShowNewChatDialog] = useState(false);

    const isMenuOpened = Boolean(anchor);
    const showType = (type: EpisodeType) => typeFilter.includes(type);

    const getFilteredEpisodes = (): Episode[] => {
        if (statusFilter === 'Closed') return episodes.filter(e => (e.status === EpisodeStatus.Closed) && typeFilter.includes(e.type));
        else if (statusFilter === 'Opened') return episodes.filter(e => (e.status === EpisodeStatus.Opened) && typeFilter.includes(e.type));
        else return episodes.filter(e => typeFilter.includes(e.type));
    }

    const toogleTypeFilter = (type: EpisodeType) => {
        setTypeFilter(prev => {
            if (prev.includes(type)) return prev.filter(t => t !== type);
            else return [...prev, type];
        });
    }

    const onNewChatEpisode = () => {
        setAnchor(null);
        setShowNewChatDialog(true);
    }

    return (
        <Panel control={<ChatListControl episodes={getFilteredEpisodes()} session={session} activeEpisode={activeEpisode} onSelect={onActivateChatCard}/>}>
            <ChatIcon />
            <MenuLabel>{`${statusFilter} Episodes (${getFilteredEpisodes().length})`}</MenuLabel>
            <div className="align-right"><IconButton id="expand-menu-chat" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
            <Menu anchorEl={anchor} open={isMenuOpened} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => setStatusFilter('All')}>{statusFilter === 'All' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={statusFilter !== 'All'}>All</ListItemText></MenuItem>
                <MenuItem onClick={() => setStatusFilter('Opened')}>{statusFilter === 'Opened' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={statusFilter !== 'Opened'}>Opened</ListItemText></MenuItem>
                <MenuItem onClick={() => setStatusFilter('Closed')}>{statusFilter === 'Closed' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={statusFilter !== 'Closed'}>Closed</ListItemText></MenuItem>
                <Divider />
                <MenuItem onClick={() => toogleTypeFilter(EpisodeType.BotConvo)}>{showType(EpisodeType.BotConvo) ? <ListItemIcon><CheckCircleIcon style={{ color: "red" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(EpisodeType.BotConvo)}>Bot Conversation</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(EpisodeType.CallCentre)}>{showType(EpisodeType.CallCentre) ? <ListItemIcon><CheckCircleIcon style={{ color: "orange" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(EpisodeType.CallCentre)}>Call Centre</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(EpisodeType.Diary)}>{showType(EpisodeType.Diary) ? <ListItemIcon><CheckCircleIcon style={{ color: "yellow" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(EpisodeType.Diary)}>Diary</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(EpisodeType.Group)}>{showType(EpisodeType.Group) ? <ListItemIcon><CheckCircleIcon style={{ color: "green" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(EpisodeType.Group)}>Group</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(EpisodeType.HealthScreening)}>{showType(EpisodeType.HealthScreening) ? <ListItemIcon><CheckCircleIcon style={{ color: "blue" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(EpisodeType.HealthScreening)}>Health Screening</ListItemText></MenuItem>
                <MenuItem onClick={() => toogleTypeFilter(EpisodeType.PeerToPeer)}>{showType(EpisodeType.PeerToPeer) ? <ListItemIcon><CheckCircleIcon style={{ color: "indigo" }} /></ListItemIcon> : ''}<ListItemText inset={!showType(EpisodeType.PeerToPeer)}>Peer to Peer</ListItemText></MenuItem>
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
