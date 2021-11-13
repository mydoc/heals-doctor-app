import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MenuBar from "../MenuBar/MenuBar";
import MenuLabel from "../MenuLabel/MenuLabel";
import { Content, Wrapper } from "./EpisodesPanel.styles";
import { useContext, useState } from "react";

// icons
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { DataContext } from '../../contexts/DataContext';
import ChatCard from "../ChatCard/ChatCard";
import { Episode } from "../../interfaces";


interface EpisodesPanelProp {
    episodes: Episode[];
    activeEpisode: Episode | null;
    onActivateChatCard: (e: Episode) => void;
}

const EpisodesPanel = ({ episodes, onActivateChatCard, activeEpisode }: EpisodesPanelProp) => {

    const { session } = useContext(DataContext);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    return (
        <Wrapper>
            <MenuBar>
                <ChatIcon />
                <MenuLabel>Episodes</MenuLabel>
                <div className="align-right"><IconButton id="expand-menu-chat" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
            </MenuBar>
            <Menu id="expand-menu-chat" anchorEl={anchor} open={anchor?.id === "expand-menu-chat"} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => {}}>Group Chat</MenuItem>
                <MenuItem onClick={() => { }}>Direct Chat</MenuItem>
                <Divider />
                <MenuItem onClick={() => {}}>Search Episodes</MenuItem>
            </Menu>
            <Content>
                {episodes.map((episode) => (
                    <ChatCard key={episode.id} isActive={episode.id === activeEpisode?.id } episode={episode} session={session!} onClick={ (e) => onActivateChatCard(e) }/>
                ))}
            </Content>
        </Wrapper>
    )
}

export default EpisodesPanel;
