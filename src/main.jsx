import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Navbar from './components/Navbar';
import ProfilePreview from './components/ProfilePreview';
import PublicProfile from './pages/PublicProfile';
import AuthForm from './components/AuthForm';





const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
