import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(()=>{
    async function load() {
      try {
        const res = await api.get(`/profiles/public/${username}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setProfile(null);
      }
    }
    load();
  },[username]);

  if (!profile) return <div className="container card">Profile not found.</div>;
  return (
    <div className="container">
      <div className="card" style={{padding:20}}>
        <h1>{profile.name}</h1>
        <p>{profile.email}</p>
        <div>
          {(profile.skills||[]).map((s,i)=>(<span key={i} style={{display:'inline-block',padding:'6px 10px',margin:6,background:'#eef2ff',borderRadius:999}}>{s}</span>))}
        </div>
        <h3>Projects</h3>
        {(profile.projects||[]).map((p,i)=>(
          <div key={i} className="card" style={{marginBottom:8}}>
            <strong>{p.title}</strong>
            <p>{p.description}</p>
            <a href={p.link} target="_blank" rel="noreferrer">{p.link}</a>
          </div>
        ))}
        <div style={{marginTop:12}}><a className="btn" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer">View GitHub</a></div>
      </div>
    </div>
  );
}
