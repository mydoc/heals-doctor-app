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
import { CDockForm, CDockLayoutItem, DockLayoutDirection, useDockManager } from './braincase/Form/DockPanelSuite/hooks';
import DockManager from './braincase/Form/DockPanelSuite/DockManager';



const EpisodesManager = () => {

    const { session } = useContext(DataContext);

    // UI state
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const {
        episodes, activeEpisode, appointments,
        addMessage, selectActiveEpisode
    } = useEpisodes(session);
    const [isBotChat, setIsBotChat] = useState(false);

    const { layout, dockManager } = useDockManager();

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

    useEffect(() => {
        const apptForm = dockManager.createForm('Appointment');
        const chatForm = dockManager.createForm('Chat');
        const episodesForm = dockManager.createForm('Episodes');
        const caseForm = dockManager.createForm('Case');
        const profileForm = dockManager.createForm('Profile')

        const apptPanel = dockManager.createPanel([apptForm]);
        const chatPanel = dockManager.createPanel([chatForm]);
        const episodesPanel = dockManager.createPanel([episodesForm]);
        const casePanel = dockManager.createPanel([caseForm]);
        const profilePanel = dockManager.createPanel([profileForm]);

        const bottomLeft = dockManager.createSplitter(apptPanel, profilePanel, DockLayoutDirection.Vertical);
        const left = dockManager.createSplitter(episodesPanel, bottomLeft, DockLayoutDirection.Vertical);
        const right = dockManager.createSplitter(chatPanel, casePanel);
        const root = dockManager.createSplitter(left, right);

        dockManager.setLayout(root);
    }, []);

    const onStacking = (source: string, dest: string): boolean => {
        dockManager.stack(source, dest);
        return true;
    }

    const onSplitting = (source: string, dest: string, direction: DockLayoutDirection): boolean => {
        dockManager.split(source, dest, direction);
        return true;
    }

    const onRenderForm = (form: CDockForm) => {

        switch (form.title) {
            case 'Appointment':
                return <AppointmentsPanel appointments={appointments} />;
            case 'Chat':
                return <ChatPanel episode={activeEpisode} onSendMessage={(e) => { handleSendMessage(e) }} />
            case 'Episodes':
                return <EpisodesPanel episodes={episodes!} activeEpisode={activeEpisode} onActivateChatCard={(e) => handleActivateEpisode(e)} />
            case 'Case':
                return <CasePanel episode={activeEpisode} />;
            case 'Profile':
                return (
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
                );
            default:
                return <div>Unknown Form</div>
        }
    }

    return (
        <DockManager onStacking={onStacking} onSplitting={onSplitting} layout={layout} onRenderForm={onRenderForm} />
    )
}

export default EpisodesManager;
