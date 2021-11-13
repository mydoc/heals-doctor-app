import { ClickAwayListener, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import MenuLabel from "../MenuLabel/MenuLabel";
import { useContext, useState } from "react";

// icons
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { DataContext } from '../../contexts/DataContext';
import { Episode, EpisodeStatus } from "../../interfaces";
import { Check } from "@mui/icons-material";
import Panel from "../Panel/Panel";
import ChatListControl from "../ChatListControl/ChatListControl";


interface EpisodesPanelProp {
    episodes: Episode[];
    activeEpisode: Episode | null;
    onActivateChatCard: (e: Episode) => void;
}

const EpisodesPanel = ({ episodes, onActivateChatCard, activeEpisode }: EpisodesPanelProp) => {

    const { session } = useContext(DataContext);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [filter, setFilter] = useState<'All' | 'Opened' | 'Closed'>('All');

    const isMenuOpened = Boolean(anchor);

    const getFilteredEpisodes = (): Episode[] => {
        if (filter === 'Closed') return episodes.filter(e => e.status === EpisodeStatus.Closed);
        else if (filter === 'Opened') return episodes.filter(e => e.status === EpisodeStatus.Opened);
        else return episodes;
    }

    return (
        <Panel control={<ChatListControl episodes={getFilteredEpisodes()} session={session} activeEpisode={activeEpisode} onSelect={onActivateChatCard}/>}>
            <ChatIcon />
            <MenuLabel>{`${filter} Episodes (${getFilteredEpisodes().length})`}</MenuLabel>
            <div className="align-right"><IconButton id="expand-menu-chat" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
            <Popper anchorEl={anchor} id="expand-menu-chat" open={isMenuOpened} placement='bottom-start'>
            <ClickAwayListener onClickAway={() => setAnchor(null)}>
                <Paper>
                    <MenuList>
                        <MenuItem onClick={ () => setFilter('All') }>{filter === 'All' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={ filter !== 'All'}>All</ListItemText></MenuItem>
                        <MenuItem onClick={() => setFilter('Opened')}>{filter === 'Opened' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={filter !== 'Opened'}>Opened</ListItemText></MenuItem>
                        <MenuItem onClick={() => setFilter('Closed')}>{filter === 'Closed' ? <ListItemIcon><Check /></ListItemIcon> : ''}<ListItemText inset={filter !== 'Closed'}>Closed</ListItemText></MenuItem>
                        <Divider />
                        <MenuItem onClick={() => { }}>Create Group Chat</MenuItem>
                        <MenuItem onClick={() => { }}>Create Direct Chat</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => {}}>Search Episodes</MenuItem>
                    </MenuList>
                </Paper>
            </ClickAwayListener>
        </Popper>
        </Panel>
    )
}

export default EpisodesPanel;
