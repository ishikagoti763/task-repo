import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import StartTask from './components/StartTask';
import CreatTask from './components/CreateTask'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/tasks" element={<CreatTask/>}/>
        <Route path="/startTask" element={<StartTask/>}/>
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;



