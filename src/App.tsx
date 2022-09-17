import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { DataContext } from './contexts/DataContext';
import { Database } from "./Database";

import EpisodesManager from './EpisodesManager';

import Generator from './utils/Generator';
import { DockSystem } from './DockSystem';


function App() {

  // data state
  const { data, session, setData, setSession } = useContext(DataContext);

  const handleLogIn = () => {
    setData(Generator.populateRandomData(Database));
    const doctor = data.users.find((user) => user.username === 'doctor')!;
    setSession(doctor);
  }

  if (!session) return (<button onClick={handleLogIn}>Login</button>)

  return (
    <div className="App">
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path='/' element={<DockSystem />} />
          <Route path='/queue' element={<EpisodesManager />} />
          <Route path='/progress' element={<EpisodesManager />} />
          <Route path='/settings' element={<EpisodesManager />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
