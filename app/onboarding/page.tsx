'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [subject, setSubject] = useState('Data');
  const [level, setLevel] = useState('Beginner');
  const router = useRouter();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('https://dev-nc-api.f3h.net/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subject, level }),
    });

    if (res.ok) router.push('/courses');
    else alert('Gagal onboarding');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>
      <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border px-3 py-2 rounded">
        <option value="Data">Data</option>
        <option value="Cloud">Cloud</option>
        <option value="Security">Security</option>
      </select>
      <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full border px-3 py-2 rounded mt-2">
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded mt-4">Simpan</button>
    </div>
  );
}