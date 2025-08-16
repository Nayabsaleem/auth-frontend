import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ProfileForm from './components/ProfileForm';
import ProfilePreview from './components/ProfilePreview';
import Navbar from './components/Navbar';
import PublicProfile from './pages/PublicProfile';
import api, { getProfile } from './api/api';


function Home({ user, onAuth, onLogout }) {
  const [profile, setProfile] = useState(null);

  useEffect(()=> {
    async function load() {
      try {
        if (!user) return;
        const res = await api.get(`/profiles/public/${user.id || user._id}`);
        setProfile(res.data);
      } catch (err) {
        console.warn('No profile found or fetch error', err);
      }
    }
    load();
  }, [user]);

  if (!user) {
    return <div className="container"><AuthForm onAuth={onAuth} /></div>;
  }

  return (
    <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
      <div>
        <ProfileForm initial={profile} onSave={(p)=> setProfile(p)} />
      </div>
      <div>
        <ProfilePreview profile={profile} />
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=> {
    const raw = localStorage.getItem('user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function handleAuth(userData) {
    setUser(userData);
    try { localStorage.setItem('user', JSON.stringify(userData)); } catch(e){}
    navigate('/my');
  }
  function handleLogout() {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  }
  

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} onAuth={handleAuth} onLogout={handleLogout} />} />
        <Route path="/my" element={<Home user={user} onAuth={handleAuth} onLogout={handleLogout} />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
      </Routes>
    </div>
  );


}