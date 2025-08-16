import React from 'react';

export default function ProfilePreview({ profile }) {
  if (!profile) return (
    <div className="card"><em>No profile to preview</em></div>
  );
  return (
    <div className="card">
      <h2>Profile Preview</h2>
      <h3>{profile.name}</h3>
      <p>{profile.email}</p>
      <h4>Skills</h4>
      <ul>
        {(profile.skills || []).map((s,i)=><li key={i}>{s}</li>)}
      </ul>
      <h4>Projects</h4>
      {(profile.projects || []).map((p,i)=>(
        <div key={i} style={{marginBottom:8}}>
          <strong>{p.title}</strong>
          <div>{p.description}</div>
          <a href={p.link} target="_blank" rel="noreferrer">{p.link}</a>
        </div>
      ))}
      <h4>GitHub</h4>
      <div>{profile.github}</div>
    </div>
  );
}
