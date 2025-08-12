import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 16px'}}>
      <div style={{fontWeight:700}}><Link to="/" style={{textDecoration:'none',color:'#111'}}>Portfolio Builder</Link></div>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/">Home</Link>
        <Link to="/my">My Profile</Link>
        <Link to={`/profile/${user?.name || ''}`}>Public Profile</Link>
        {user ? <button className="btn" onClick={onLogout}>Logout</button> : <Link to="/">Login</Link>}
      </div>
    </nav>
  );
}
