import React from 'react';
import "./index.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './forms/Login';
import Signup from './forms/Signup';

const App = () => {
  const isLoggedIn = localStorage.getItem('userName');

  return (
    <Router>
      <Routes>
        {isLoggedIn && <Route path="/" element={<Navigate to="/" />} />}
        
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/signup" element={<Signup />} />}

        <Route index element={<Home />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
