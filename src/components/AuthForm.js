import React, { useState } from 'react';
import { login, register } from '../api/api';

export default function AuthForm({ onAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isRegister) {
        const res = await register({ name, email, password });
        alert('Registered. Now login.');
        setIsRegister(false);
      } else {
        const res = await login({ email, password });
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem('token', token);
        onAuth(user);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Auth error');
    }
  }

  return (
    <div className="card" style={{maxWidth:420}}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label>Name</label>
            <input className="field" value={name} onChange={e=>setName(e.target.value)} />
          </>
        )}
        <label>Email</label>
        <input className="field" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input className="field" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p style={{marginTop:12}}>
        <button className="btn" type="button" onClick={()=>setIsRegister(!isRegister)} style={{background:'#10b981'}}>
          {isRegister ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </p>
    </div>
  );
}
