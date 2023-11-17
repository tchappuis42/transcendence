import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pong from './pages/Game/Pong';
import SocketPong from './pages/Game/socketpong';
import Chat from './pages/Chat/chat';
import { Profil } from './pages/Profil/Profil';
import { TopBar } from "./pages/topBar/topBar";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          {/*<Route path='/' element={<TopBar />} >*/}
          <Route path='test' element={<SocketPong />} />
          <Route path='pong' element={<Pong />} />
          <Route path='chat' element={<Chat />} />
          <Route path='profil' element={<Profil />} />
        </Route >
      </Routes >
    </BrowserRouter >
  );
};

export default App;