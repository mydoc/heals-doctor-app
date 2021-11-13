import { useContext, useState, useEffect } from 'react';
import Splitter from './components/Splitter/Splitter';
import MenuBar from './components/MenuBar/MenuBar';
import CasePanel from './components/CasePanel/CasePanel';
import MenuLabel from './components/MenuLabel/MenuLabel';
import ChatPanel from './components/ChatPanel/ChatPanel';
import EpisodesPanel from './components/EpisodesPanel/EpisodesPanel';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';

import { DataContext } from './contexts/DataContext';
import useEpisodes from './hooks/useEpisodes';

import { ChatMessage, Episode, User } from './interfaces';
import Generator from './utils/Generator';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';

const EpisodesManager = () => {

    const { session } = useContext(DataContext);

    // UI state
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const {
        episodes, activeEpisode,
        addMessage, selectActiveEpisode
    } = useEpisodes(session);
    const [isBotChat, setIsBotChat] = useState(false);

    useEffect(() => {

        console.log('isBotChat', isBotChat, 'activeEpisode', !!activeEpisode)

        if (isBotChat) {
            setIsBotChat(false);

            if (activeEpisode) {

                const botSendChat = () => {
                    console.log('Bot sending...');
                    const other = activeEpisode!.participants.filter((p) => p.id !== session!.id);
                    const newMessage = new ChatMessage({
                        "datetime": new Date(),
                        "message": Generator.getSentence(),
                        "userId": other[0].id
                    }, other[0]);

                    console.log('Bot sending... end', newMessage);
                    //setActiveEpisode((prev) => { return { ...prev!, messages: [...prev!.messages, newMessage] } });
                    addMessage(newMessage);
                }


                setTimeout(() => {
                    botSendChat();
                }, Math.random() * 3000 + 500);
            }
        }
    }, [isBotChat, activeEpisode, session, addMessage]);



    const handleSendMessage = (message: string) => {
        if (session && activeEpisode) {
            const newMessage = new ChatMessage({
                "datetime": new Date(),
                "message": message,
                "userId": session.id
            }, new User(session));

            console.log('handleSendMessage', message);

            // setActiveEpisode((prev) => { return { ...prev!, messages: [...prev!.messages, newMessage] } });
            addMessage(newMessage);

            setIsBotChat(true);
        }
    }

    const handleActivateEpisode = (episode: Episode) => {

        selectActiveEpisode(episode);
    }

    return (
        <Splitter primaryIndex={1} secondaryInitialSize={260} secondaryMinSize={50}>
            <Splitter vertical primaryIndex={1} secondaryInitialSize={50} secondaryMinSize={20} percentage={true}>
                <EpisodesPanel episodes={episodes!} activeEpisode={activeEpisode} onActivateChatCard={(e) => handleActivateEpisode(e)} />
                <Splitter vertical enabled={true} primaryIndex={0} secondaryInitialSize={50} secondaryMinSize={50}>
                    <PropertiesPanel instance={activeEpisode} />
                    <div>
                        <MenuBar>
                            <VideoCameraFrontIcon /><MenuLabel>David Copperfield</MenuLabel>
                            <div className="align-right"><IconButton id="expand-menu-system" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)}><MenuIcon /></IconButton></div>
                        </MenuBar>
                        <Menu id="expand-menu-system" anchorEl={anchor} open={anchor?.id === "expand-menu-system"} onClose={() => setAnchor(null)}>
                            <MenuItem onClick={() => { }}>Profile</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => { }}>Log Out</MenuItem>
                        </Menu>
                    </div>
                </Splitter>
            </Splitter>
            <Splitter primaryIndex={1} secondaryInitialSize={50} secondaryMinSize={30} percentage={true}>
                <ChatPanel episode={activeEpisode} onSendMessage={(e) => { handleSendMessage(e) }} />
                <CasePanel />
            </Splitter>
        </Splitter>
    )
}

export default EpisodesManager;
