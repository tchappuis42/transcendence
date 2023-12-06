import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SocketPong from './pages/Game/socketpong';
import Chat from './pages/Chat/chat';
import { Profil } from './pages/Profil/Profil';
import { TopBar } from "./pages/topBar/topBar";
import Settings from './pages/Settings/Settings';
import Testfriends from './pages/Friend/testfriends';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          {/*<Route path='/' element={<TopBar />} >*/}
          <Route path='pong' element={<SocketPong />} />
          <Route path='chat' element={<Chat />} />
          <Route path='profil' element={<Profil />} />
          <Route path='settings' element={<Settings />} />
        </Route >
      </Routes >
    </BrowserRouter >
  );
};

export default App;