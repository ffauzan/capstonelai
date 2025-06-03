"use client"

import { Bookmark } from "lucide-react"
import Image from "next/image"

interface Course {
  id: number
  course_title: string
  subject: string
  level: string
  url: string
  is_paid: boolean
  price: number
}

interface Props {
  course: Course
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-40 w-full">
        {/* Gambar placeholder karena tidak ada image dari API */}
        <Image
          src="/placeholder.svg"
          alt={course.course_title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {course.course_title}
            </h3>
            <p className="text-sm text-gray-500">{course.subject}</p>
          </div>
          <Bookmark className="h-5 w-5 text-gray-400" />
        </div>

        <p className="text-sm text-gray-500 mb-1">{course.level}</p>
        <p className="text-green-600 font-medium text-sm mb-3">
          {course.is_paid ? `$ ${course.price}` : "Gratis"}
        </p>

        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-teal-600 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-700 transition-colors"
        >
          Lihat Course
        </a>
      </div>
    </div>
  )
}
