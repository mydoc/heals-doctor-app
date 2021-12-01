import { useContext, useState, useEffect } from 'react';
import Splitter from './braincase/Form/Splitter/Splitter';
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

import Generator from './utils/Generator';
import AppointmentsPanel from './components/AppointmentsPanel/AppointmentsPanel';
import { Episode, Message, MessageType  } from './interfaces/episode';
import { User } from './interfaces/user';
import DockManager from './braincase/Form/DockPanelSuite/DockManager/DockManager';
import { CDockLayoutItem, CDockManager, DockLayoutDirection } from './braincase/Form/DockPanelSuite/behavior';

const EpisodesManager = () => {

    const { session } = useContext(DataContext);

    // UI state
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const {
        episodes, activeEpisode, appointments,
        addMessage, selectActiveEpisode
    } = useEpisodes(session);
    const [isBotChat, setIsBotChat] = useState(false);

    useEffect(() => {

        if (isBotChat) {
            setIsBotChat(false);

            if (activeEpisode) {

                const botSendChat = () => {
                    console.log('Bot sending...');
                    const other = activeEpisode!.participants.filter((p) => p.id !== session!.id);
                    const newMessage = new Message({
                        "datetime": new Date(),
                        "message": Generator.randomSentence(),
                        "userId": other[0].id,
                        "type": MessageType.Message
                    }, other[0]);

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
            const newMessage = new Message({
                "datetime": new Date(),
                "message": message,
                "userId": session.id,
                "type": MessageType.Message
            }, new User(session));

            addMessage(newMessage);

            setIsBotChat(true);
        }
    }

    const handleActivateEpisode = (episode: Episode) => {

        selectActiveEpisode(episode);
    }

    // return (
    //     <Splitter primaryIndex={1} secondaryInitialSize={300} secondaryMinSize={50}>
    //         <Splitter vertical primaryIndex={1} secondaryInitialSize={50} secondaryMinSize={20} percentage={true}>
    //             <EpisodesPanel episodes={episodes!} activeEpisode={activeEpisode} onActivateChatCard={(e) => handleActivateEpisode(e)} />
    //             <Splitter vertical enabled={true} primaryIndex={0} secondaryInitialSize={50} secondaryMinSize={50}>
    //                 <AppointmentsPanel appointments={appointments} />
    //
    //             </Splitter>
    //         </Splitter>
    //         <Splitter primaryIndex={1} secondaryInitialSize={50} secondaryMinSize={30} percentage={true}>
    //             <ChatPanel episode={activeEpisode} onSendMessage={(e) => { handleSendMessage(e) }} />
    //             <CasePanel episode={activeEpisode} />
    //         </Splitter>
    //     </Splitter>
    // )







    const [layout, setLayout] = useState<CDockLayoutItem>(CDockManager.createPanel([]));
    useEffect(() => {
        const apptForm = CDockManager.createForm('Appointment', <AppointmentsPanel appointments={appointments} />);
        const chatForm = CDockManager.createForm('Chat', <ChatPanel episode={activeEpisode} onSendMessage={(e) => { handleSendMessage(e) }} />);
        const episodesForm = CDockManager.createForm('Episodes', <EpisodesPanel episodes={episodes!} activeEpisode={activeEpisode} onActivateChatCard={(e) => handleActivateEpisode(e)} />);
        const caseForm = CDockManager.createForm('Case', <CasePanel episode={activeEpisode} />);
        const profileForm = CDockManager.createForm('Profile', (
            <div>
                <MenuBar>
                    <VideoCameraFrontIcon /><MenuLabel>{`${session?.firstName} ${session?.lastName}`}</MenuLabel>
                    <div className="align-right"><IconButton id="expand-menu-system" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)}><MenuIcon /></IconButton></div>
                </MenuBar>
                <Menu id="expand-menu-system" anchorEl={anchor} open={anchor?.id === "expand-menu-system"} onClose={() => setAnchor(null)}>
                    <MenuItem onClick={() => { }}>Profile</MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { }}>Log Out</MenuItem>
                </Menu>
            </div>
        ))

        const apptPanel = CDockManager.createPanel([apptForm]);
        const chatPanel = CDockManager.createPanel([chatForm]);
        const episodesPanel = CDockManager.createPanel([episodesForm]);
        const casePanel = CDockManager.createPanel([caseForm]);
        const profilePanel = CDockManager.createPanel([profileForm]);

        const bottomLeft = CDockManager.createSplitter(apptPanel, profilePanel, DockLayoutDirection.Vertical);
        const left = CDockManager.createSplitter(episodesPanel, bottomLeft, DockLayoutDirection.Vertical);
        const right = CDockManager.createSplitter(chatPanel, casePanel);
        const root = CDockManager.createSplitter(left, right);

        setLayout(root);
    }, [appointments, activeEpisode, episodes, session, anchor])

    const handleLayout = (source: string, dest: string) => {
        setLayout(prev => {return { ...CDockManager.moveForm(prev, source, dest) }});
    }

    return (
        <DockManager onLayout={handleLayout} layout={layout} />
    )
}

export default EpisodesManager;
