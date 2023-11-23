import {BrowserRouter, Route, Routes, useParams} from 'react-router-dom';
import Home from './pages/Home';
import SocketPong from './pages/Game/socketpong';
import Chat from './pages/Chat/chat';
import { Profil } from './pages/Profil/Profil';
import { TopBar } from "./pages/topBar/topBar";
import {useAccount} from "./ui/organisms/useAccount";


const App = () => {
  // const {account} = useAccount();
  // console.log("account id: ",account.id);
  const { id } = useParams();
  console.log("account id: ", id);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='pong' element={<SocketPong />} />
          <Route path='chat' element={<Chat />} />
          <Route path='profil' element={<Profil />} />
          {/*<Route path='profil/:id' element={<Profil />} />*/}
        </Route >
      </Routes >
    </BrowserRouter >
  );
};

export default App;