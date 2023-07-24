import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './ui/templates/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Pong from './pages/Game/Pong';
import Test from './pages/test';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='pong' element={<Pong />} />
          <Route path='test' element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;