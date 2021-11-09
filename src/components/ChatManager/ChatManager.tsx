import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MenuBar from "../MenuBar/MenuBar";
import MenuLabel from "../MenuLabel/MenuLabel";
import { Content, Wrapper } from "./ChatManager.styles";
import { useContext, useState } from "react";

// icons
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import { Episode } from "../../hooks/useEpisodes";
import { DataContext } from '../../contexts/DataContext';
import ChatCard from "../ChatCard/ChatCard";


interface ChatManagerProp {
    episodes: Episode[];
    activeEpisode?: Episode;
    onActivateChatCard: (e: Episode) => void;
}

const ChatManager = ({ episodes, onActivateChatCard, activeEpisode }: ChatManagerProp) => {

    const { session } = useContext(DataContext);

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    return (
        <Wrapper>
            <MenuBar>
                <ChatIcon />
                <MenuLabel>Chats</MenuLabel>
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

export default ChatManager;
