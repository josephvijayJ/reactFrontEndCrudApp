import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allusers from './components/Allusers';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Allusers />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
