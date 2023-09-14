import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pong from './pages/Game/Pong';
import SocketPong from './pages/Game/socketpong';
import GamePage from './pages/Game/gamePage';
import Chat from './pages/Chat/chat';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='pong' element={<GamePage />} />
          <Route path='test' element={<SocketPong />} />
          <Route path='pong' element={<Pong />} />
          <Route path='chat' element={<Chat />} />
        </Route >
      </Routes >
    </BrowserRouter >
  );
};

export default App;