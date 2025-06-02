import React from "react"

interface Course {
  id: number;
  course_title: string;
  subject: string;
  level: string;
  url: string;
  is_paid: boolean;
  price: number;
}

export default async function CoursesPage() {
  const res = await fetch("https://dev-nc-api.f3h.net/api/courses/random?n=2", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Gagal mengambil data kursus")
  }

  const json = await res.json();
  const data: Course[] = json.data ? json.data : json; // menyesuaikan jika array langsung

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded shadow">
              {/* Karena tidak ada image, pakai gambar default */}
              <img
                src="/course-default.png"
                alt={course.course_title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{course.course_title}</h2>
              <p className="text-gray-600 mb-1">{course.subject}</p>
              <p className="text-gray-500 mb-1">{course.level}</p>
              <p className="text-green-600 font-semibold mb-2">
                {course.is_paid ? `Rp${course.price}` : "Gratis"}
              </p>
              <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Lihat Course
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}