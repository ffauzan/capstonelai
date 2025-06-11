// FIX 1: Wajib ditambahkan untuk komponen yang menggunakan hooks (useState, useEffect)
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// FIX 2: Mendefinisikan Tipe Data untuk Course
// Ini akan membuat kode lebih aman dan mudah dikelola daripada menggunakan `any`
type Course = {
  course_id: number;
  course_title: string;
  image_banner_url: string; // Mungkin akan kita tambahkan nanti
  is_paid: boolean;
  level: string;
  price: number;
  subject: string;
  // tambahkan properti lain jika perlu
};

export default function CourseDetailPage() {
  // useParams akan memberikan { id: 'nilai_id_dari_url' }
  const params = useParams();
  const id = params.id; // Mengambil ID dari object params

  const [course, setCourse] = useState<Course | null>(null);
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pastikan `id` sudah tersedia sebelum melakukan fetch
    if (!id) return;

    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        // FIX 3: Menjalankan kedua fetch secara paralel untuk performa lebih baik
        const [courseRes, recsRes] = await Promise.all([
          fetch(`https://dev-nc-api.f3h.net/api/courses/${id}`),
          fetch(`https://dev-nc-api.f3h.net/api/courses/recommender1?course_id=${id}&n=3`)
        ]);

        if (!courseRes.ok) throw new Error('Gagal memuat detail kursus.');
        if (!recsRes.ok) throw new Error('Gagal memuat rekomendasi.');

        const courseData = await courseRes.json();
        const recsData = await recsRes.json();

        // FIX 4: Bug utama ada di sini. Data asli berada di dalam properti `.data`
        setCourse(courseData.data);
        setRecommendations(recsData.data);

      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]); // Dependency array tetap `id`

  if (loading) {
    return <div className="text-center mt-20">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }
  
  if (!course) {
     return <div className="text-center mt-20">Kursus tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      {/* Detail Kursus Utama */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.course_title}</h1>
        <div className="flex items-center space-x-4 text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{course.subject}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">{course.level}</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                {course.is_paid ? `Rp ${course.price.toLocaleString('id-ID')}` : ''}
            </span>
        </div>
      </div>

      {/* Bagian Rekomendasi */}
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Rekomendasi Kursus Lainnya</h2>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Link href={`/courses/${rec.course_id}`} key={rec.course_id} className="block border p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50 hover:shadow-md transition-all">
            <h3 className="font-medium text-lg text-blue-700">{rec.course_title}</h3>
            <p className="text-sm text-gray-500 mt-1">{rec.subject} - {rec.level}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}