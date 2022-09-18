import { useContext, useState, useEffect, useRef } from 'react';
import MenuBar from './components/MenuBar/MenuBar';
import CasePanel from './components/CasePanel/CasePanel';
import MenuLabel from './components/MenuLabel/MenuLabel';
import ChatPanel from './components/ChatPanel/ChatPanel';
import EpisodesPanel from './components/EpisodesPanel/EpisodesPanel';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';

import { DataContext } from './contexts/DataContext';
import useEpisodes from './hooks/useEpisodes';

import Generator from './utils/Generator';
import AppointmentsPanel from './components/AppointmentsPanel/AppointmentsPanel';
import { Episode, Message, MessageType  } from './interfaces/episode';
import { User, UserRole } from './interfaces/user';
import PropertiesControl from './components/PropertiesControl/PropertiesControl';
import useEventListener from './hooks/useEventListener';
import { DockManager, useDockManager, RenderEvent, CDockForm, CDockPanel } from './react-dockpanel';
import PatientPanel from './components/PatientPanel/PatientPanel';

const ConsultationManager = () => {

    const { session } = useContext(DataContext);

    // UI state
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const {
        episodes, activeEpisode, appointments,
        addMessage, selectActiveEpisode
    } = useEpisodes(session);
    const [isBotChat, setIsBotChat] = useState(false);

    const isInit = useRef(false);
    const dockManager = useDockManager();

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

    //const [showAppBar, setShowAppBar] = useState(true);
    const handleToggleAppBar = ({ key }: any) => {
        const F9_KEYS = ['120', 'F9'];
        if (F9_KEYS.includes(String(key))) {
            console.log(dockManager.layout);
        }
    }
    useEventListener('keydown', handleToggleAppBar);

    useEffect(() => {
        if (!isInit.current) {
            const chatForm = dockManager.createForm('Chat');
            const caseForm = dockManager.createForm('Case');
            const propertiesForm = dockManager.createForm('Properties')
            const patientForm = dockManager.createForm('Patient');

            const episodesPanel = dockManager.createPanel([patientForm, chatForm, propertiesForm]);
            const casePanel = dockManager.createPanel([caseForm]);

            const splitter = dockManager.createSplitter(episodesPanel, casePanel, false, 100);

            dockManager.setLayout(splitter);
            isInit.current = true;
        }
    }, [dockManager]);

    const onRenderForm = (e: RenderEvent<CDockForm>) => {

        switch (e.item.name) {
            case 'Properties':
                e.content = <PropertiesControl instance={activeEpisode} />
                break;
            case 'Appointment':
                e.content = <AppointmentsPanel appointments={appointments} />;
                break;
            case 'Patient':
                e.content = <PatientPanel patient={activeEpisode!.participants.find(u => u.role === UserRole.patient)!} />
                break
            case 'Chat':
                e.content = <ChatPanel episode={activeEpisode} onSendMessage={(e) => { handleSendMessage(e) }} />
                break;
            case 'Episodes':
                e.content = <EpisodesPanel episodes={episodes!} activeEpisode={activeEpisode} onActivateChatCard={(e) => handleActivateEpisode(e)} />
                break;
            case 'Case':
                e.content = <CasePanel episode={activeEpisode} />;
                break;
            default:
                e.content = <div>Unknown Form</div>
                break;
        }
    }

    const onRenderPanel = (e: RenderEvent<CDockPanel>) => {
        const form = e.item.forms[e.item.activeIndex];
        switch (form.name) {
            case 'Properties':
                break;
            case 'Appointment':
                break;
            case 'Chat':
                break;
            case 'Episodes':
                break;
            case 'Case':
                e.content = <><FavoriteTwoToneIcon fontSize="small" /> <span>Case</span></>
                break;
            case 'Profile':
                break;
            default:
                break;
        }
    }

    return (
        <DockManager manager={dockManager} onRenderForm={onRenderForm} onRenderPanel={onRenderPanel} />
    )
}

export default ConsultationManager;
