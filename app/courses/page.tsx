// app/courses/page.tsx

import React from "react"

interface Course {
  id: string
  title: string
  description: string
  image: string
  // Tambahkan properti lain sesuai dengan struktur data dari API
}

export default async function CoursesPage() {
  const res = await fetch("https://nc-api.dicoding.dev/api/courses/random", {
    cache: "no-store", // Menghindari caching agar selalu mendapatkan data terbaru
  })

  if (!res.ok) {
    throw new Error("Gagal mengambil data kursus")
  }

  const data: Course[] = await res.json()

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded shadow">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
