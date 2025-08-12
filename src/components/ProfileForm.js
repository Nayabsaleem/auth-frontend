import React, { useState, useEffect } from 'react';
import { createOrUpdateProfile } from '../api/api';

export default function ProfileForm({ initial, onSave }) {
  const [name, setName] = useState(initial?.name || '');
  const [email, setEmail] = useState(initial?.email || '');
  const [skills, setSkills] = useState(initial?.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [projects, setProjects] = useState(initial?.projects || []);
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projLink, setProjLink] = useState('');
  const [github, setGithub] = useState(initial?.github || '');

  useEffect(()=> {
    setName(initial?.name || '');
    setEmail(initial?.email || '');
    setSkills(initial?.skills || []);
    setProjects(initial?.projects || []);
    setGithub(initial?.github || '');
  }, [initial]);

  function addSkill() {
    if (!skillInput) return;
    setSkills([...skills, skillInput]);
    setSkillInput('');
  }
  function addProject() {
    if (!projTitle) return;
    setProjects([...projects, { title: projTitle, description: projDesc, link: projLink }]);
    setProjTitle(''); setProjDesc(''); setProjLink('');
  }

  async function save(e) {
    e.preventDefault();
    const payload = { ...initial, name, email, skills, projects, github };
    try {
      const res = await createOrUpdateProfile(payload);
      onSave(res.data);
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  }

  return (
    <div className="card">
      <h2>Profile Form</h2>
      <form onSubmit={save}>
        <label>Name</label>
        <input className="field" value={name} onChange={e=>setName(e.target.value)} />
        <label>Email</label>
        <input className="field" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Skills</label>
        <div className="flex">
          <input className="field" style={{flex:1}} value={skillInput} onChange={e=>setSkillInput(e.target.value)} placeholder="Add skill" />
          <button type="button" className="btn" onClick={addSkill}>Add</button>
        </div>
        <div>
          {skills.map((s,i)=> <span key={i} style={{display:'inline-block',padding:6, margin:6, background:'#eef2ff', borderRadius:6}}>{s}</span>)}
        </div>

        <label>Projects</label>
        <input className="field" value={projTitle} placeholder="Title" onChange={e=>setProjTitle(e.target.value)} />
        <input className="field" value={projDesc} placeholder="Description" onChange={e=>setProjDesc(e.target.value)} />
        <div className="flex">
          <input className="field" style={{flex:1}} value={projLink} placeholder="Link" onChange={e=>setProjLink(e.target.value)} />
          <button type="button" className="btn" onClick={addProject}>Add</button>
        </div>
        <div>
          {projects.map((p,i)=> <div key={i} style={{padding:8, margin:8, border:'1px solid #eef2ff', borderRadius:6}}>
            <strong>{p.title}</strong>
            <div>{p.description}</div>
            <a href={p.link} target="_blank" rel="noreferrer">{p.link}</a>
          </div>)}
        </div>

        <label>GitHub Username / Link</label>
        <input className="field" value={github} onChange={e=>setGithub(e.target.value)} />

        <button className="btn" type="submit">Save Profile</button>
      </form>
    </div>
  );
}
