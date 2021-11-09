import { GlobalStyles } from './GlobalStyles';

import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import MenuIcon from '@mui/icons-material/Menu';

import Splitter from './components/Splitter/Splitter';
import MenuBar from './components/MenuBar/MenuBar';
import EpisodeManager from './components/EpisodeManager/EpisodeManager';
import MenuLabel from './components/MenuLabel/MenuLabel';
import PatientManager from './components/PatientManager/PatientManager';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from './contexts/DataContext';
import ChatManager from './components/ChatManager/ChatManager';
import Generator from './utils/Generator';
import { Database } from "./Database";
import useEpisodes, { Episode } from './hooks/useEpisodes';
import { IChatMessage } from './interfaces';

function App() {

  // UI state
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // data state
  const { data, session, setData, setSession } = useContext(DataContext);
  const { episodes, setEpisodes, activeEpisode, setActiveEpisode } = useEpisodes();

  const [isBotChat, setIsBotChat] = useState(false);

  // initialise data

  useEffect(() => {
    setData(Generator.populateRandomData(Database));
    const doctor = data.users.find((user) => user.username === 'doctor')!;
    setSession(doctor);
  }, []);


  useEffect(() => {

    if (isBotChat) {

      setTimeout(() => {

        const other = activeEpisode!.participants.filter((p) => p.id !== session!.id);
        setActiveEpisode({...activeEpisode!, messages: [...activeEpisode!.messages, _createNewMessage(Generator.getSentence(), other[0].id)]});
      }, Math.random() * 3000 + 300);

      setIsBotChat(false);
    }

  }, [isBotChat])


  const _createNewMessage = (message: string, userId: number): IChatMessage => {
    const newMessage: IChatMessage = {
      "datetime": new Date(),
      "message": message,
      "userId": userId
    }

    return newMessage;
  }


  const handleSendMessage = (msg: string) => {
    setActiveEpisode({...activeEpisode!, messages: [...activeEpisode!.messages, _createNewMessage(msg, session!.id)]});
    setIsBotChat(true);
  }

  const handleActivateEpisode = (episode: Episode) => {

    setActiveEpisode(episode);
  }

  return (
    <div className="App">
      <GlobalStyles />
        <Splitter primaryIndex={1} secondaryInitialSize={260} secondaryMinSize={50}>
        <Splitter vertical primaryIndex={1} secondaryInitialSize={50} secondaryMinSize={20} percentage={true}>
          <ChatManager episodes={episodes!} activeEpisode={ activeEpisode ? activeEpisode : undefined } onActivateChatCard={(e) => handleActivateEpisode(e) }/>
              <Splitter vertical enabled={true} primaryIndex={0} secondaryInitialSize={50} secondaryMinSize={50}>
              <div>
                <MenuBar><VideoCameraFrontIcon /><MenuLabel>Appointments</MenuLabel></MenuBar>
              </div>
              <div>
                <MenuBar>
                  <VideoCameraFrontIcon /><MenuLabel>David Copperfield</MenuLabel>
                  <div className="align-right"><IconButton id="expand-menu-system" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget) }><MenuIcon /></IconButton></div>
                </MenuBar>
                <Menu id="expand-menu-system" anchorEl={anchor} open={anchor?.id === "expand-menu-system"} onClose={() => setAnchor(null)}>
                  <MenuItem onClick={() => { }}>Profile</MenuItem>
                  <Divider />
                  <MenuItem onClick={() => {}}>Log Out</MenuItem>
                </Menu>
              </div>
              </Splitter>
            </Splitter>
            <Splitter primaryIndex={1} secondaryInitialSize={50} secondaryMinSize={30} percentage={true}>
          <PatientManager episode={activeEpisode} onSendMessage={ (e) => { handleSendMessage(e) }}/>
                <EpisodeManager />
            </Splitter>
        </Splitter>
    </div>
  );
}

export default App;
