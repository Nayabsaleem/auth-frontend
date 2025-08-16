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
        await register({ name, email, password });
        alert('✅ Registered successfully! Now login.');
        setIsRegister(false);
      } else {
        const res = await login({ email, password });
        
        // 👇 Save token + user info
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // call parent onAuth
        onAuth(user);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Auth error');
    }
  }

  return (
    <div className="card shadow-lg rounded-xl p-6 bg-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">
        {isRegister ? 'Create Account' : 'Login'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            className="field border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="btn w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          type="submit"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          className="text-indigo-600 font-semibold hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}
