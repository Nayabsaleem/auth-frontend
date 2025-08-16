import React, { useState } from 'react';
import { createOrUpdateProfile } from '../api/api';

export default function ProfileForm({ initial, onSave }) {
  const [name, setName] = useState(initial?.name || '');
  const [email, setEmail] = useState(initial?.email || '');
  const [username, setUsername] = useState(initial?.username || '');
  const [skills, setSkills] = useState(initial?.skills?.join(', ') || '');
  const [projects, setProjects] = useState(initial?.projects?.join(', ') || '');
  const [github, setGithub] = useState(initial?.github || '');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        username,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        projects: projects.split(',').map(p => p.trim()).filter(Boolean),
        github
      };
      const res = await createOrUpdateProfile(initial?._id ? { ...payload, _id: initial._id } : payload);
      onSave(res.data);
      alert('✅ Profile saved successfully!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error saving profile');
    }
  }

  return (
    <div className="card bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Projects (comma separated)</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            value={projects}
            onChange={e => setProjects(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            value={github}
            onChange={e => setGithub(e.target.value)}
          />
        </div>
        <button
          className="btn w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          type="submit"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
