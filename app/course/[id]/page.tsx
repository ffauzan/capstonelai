import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res1 = await fetch(`https://dev-nc-api.f3h.net/api/courses/${id}`);
      const data1 = await res1.json();
      setCourse(data1);

      const res2 = await fetch(`https://dev-nc-api.f3h.net/api/courses/recommender1?course_id=${id}&n=3`);
      const data2 = await res2.json();
      setRecommendations(data2);
    }

    fetchData();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{course.course_title}</h1>
      <p className="mb-2">{course.subject} - {course.level}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Recommended Courses</h2>
      <div className="space-y-2">
        {recommendations.map((r) => (
          <div key={r.course_id} className="border p-4 rounded">
            <h3 className="font-medium">{r.course_title}</h3>
            <p className="text-sm text-gray-500">{r.subject} - {r.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
