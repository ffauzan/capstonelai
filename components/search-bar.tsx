'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    // Mencegah halaman refresh saat form disubmit
    e.preventDefault();
    
    // Jika query tidak kosong setelah menghapus spasi, lakukan navigasi
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
      <div className="flex items-center border-2 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-teal-500 transition-shadow">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari kursus, keahlian, atau subjek..."
          className="flex-1 outline-none text-gray-700 bg-transparent"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
