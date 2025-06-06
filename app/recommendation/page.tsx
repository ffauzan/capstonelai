'use client';

import { useEffect, useState } from 'react';

export default function RecommendationPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://dev-nc-api.f3h.net/api/courses/recommender3?n=5', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setCourses);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Recommended For You</h1>
      <div className="space-y-4">
        {courses.map((c) => (
          <div key={c.course_id} className="border p-4 rounded">
            <h2 className="font-semibold">{c.course_title}</h2>
            <p className="text-sm text-gray-500">{c.subject} - {c.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
