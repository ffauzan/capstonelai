'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Opsi yang tersedia untuk dipilih pengguna
const SUBJECT_OPTIONS = [
  'Web Development',
  'Business Finance',
  'Musical Instruments',
  'Graphic Design',
];

const LEVEL_OPTIONS = ['Beginner Level', 'Intermediate Level', 'Expert Level', 'All Levels'];

export default function OnboardingPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  // Redirect jika pengguna tidak login (tidak ada token)
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  // Fungsi untuk menangani pilihan subjek
  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject) // Hapus jika sudah ada
        : [...prev, subject] // Tambah jika belum ada
    );
  };

  // Fungsi untuk menangani pilihan level
  const handleLevelToggle = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level) // Hapus jika sudah ada
        : [...prev, level] // Tambah jika belum ada
    );
  };

  // Fungsi untuk mengirim preferensi ke API
  const handleSubmitPreferences = async () => {
    if (selectedSubjects.length === 0 || selectedLevels.length === 0) {
      setError('Please choose one subject and one level.');
      return;
    }

    setLoading(true);
    setError(null);
    const token = Cookies.get('token');

    try {
      const res = await fetch('https://dev-nc-api.f3h.net/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Sertakan token autentikasi
        },
        body: JSON.stringify({
          subject: selectedSubjects,
          level: selectedLevels,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error.');
      }

      // Jika berhasil, arahkan ke halaman utama
      router.push('/');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Selamat Datang!</h1>
          <p className="text-gray-600 mt-2">Bantu kami memahami minat Anda untuk memberikan rekomendasi terbaik.</p>
        </div>

        {/* Bagian Subjek */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pilih Subjek yang Anda Minati</h2>
          <div className="flex flex-wrap gap-3">
            {SUBJECT_OPTIONS.map((subject) => {
              const isSelected = selectedSubjects.includes(subject);
              return (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`px-4 py-2 rounded-full font-medium border-2 transition-all duration-200
                    ${isSelected 
                      ? 'bg-teal-600 text-white border-teal-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500'}`}
                >
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bagian Level */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Pilih Level Keahlian Anda</h2>
          <div className="flex flex-wrap gap-3">
            {LEVEL_OPTIONS.map((level) => {
              const isSelected = selectedLevels.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => handleLevelToggle(level)}
                  className={`px-4 py-2 rounded-full font-medium border-2 transition-all duration-200
                    ${isSelected 
                      ? 'bg-teal-600 text-white border-teal-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500'}`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Pesan Error */}
        {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6" role="alert">
                <p>{error}</p>
            </div>
        )}

        {/* Tombol Aksi */}
        <div className="mt-10">
          <button
            onClick={handleSubmitPreferences}
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-teal-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save preference and start'}
          </button>
        </div>
      </div>
    </div>
  );
}
