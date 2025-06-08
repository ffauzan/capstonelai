"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Interface tetap sama
interface Course {
  id: number
  course_id: number
  course_title: string
  subject: string
  level: string
  url: string
  is_paid: boolean
  price: number
  image_banner_url: string
}

interface Props {
  course: Course
}

export default function CourseCard({ course }: Props) {
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleBookmarkClick = async () => {
    setIsLoading(true)
    setErrorMessage(null) // Hapus error sebelumnya
    const token = Cookies.get('token')

    if (!token) {
      router.push('/auth/login')
      return
    }

    try {
      const res = await fetch('https://dev-nc-api.f3h.net/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_id: course.course_id,
          interaction_type: "bookmark",
        }),
      })

      // PERBAIKAN: Coba baca pesan error dari body respons jika gagal
      if (!res.ok) {
        let errorMsg = 'Gagal menyimpan bookmark.';
        try {
          const errorData = await res.json();
          // Gunakan pesan dari API jika ada, jika tidak gunakan status text
          errorMsg = errorData.message || `Terjadi kesalahan: ${res.statusText}`;
        } catch (e) {
          // Jika body error bukan JSON
          errorMsg = `Terjadi kesalahan: ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }

      setIsBookmarked(true)

    } catch (error: any) {
      console.error("Error saat bookmark:", error.message)
      setErrorMessage(error.message) // Tampilkan pesan error ke pengguna
      // Hapus pesan error setelah beberapa detik
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
      <Link href={`/courses/${course.course_id}`} className="block relative h-40 w-full">
        <Image
          src={course.image_banner_url || "/placeholder.svg"}
          alt={course.course_title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/placeholder.svg';
          }}
        />
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/courses/${course.course_id}`} className="flex-grow group pr-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-teal-600 transition-colors">
              {course.course_title}
            </h3>
            <p className="text-sm text-gray-500">{course.subject}</p>
          </Link>

          <button
            onClick={handleBookmarkClick}
            disabled={isLoading || isBookmarked}
            className="p-1 rounded-full hover:bg-gray-100 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Bookmark this course"
          >
            <Bookmark
              className={`h-6 w-6 transition-colors ${
                isBookmarked
                  ? 'text-teal-500 fill-teal-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-1">{course.level}</p>
        <p className="text-green-600 font-medium text-sm mb-3">
          {course.is_paid ? `$${course.price}` : "Gratis"}
        </p>
        
        <div className="flex-grow" />
        
        {/* Tampilkan pesan error jika ada */}
        {errorMessage && <p className="text-xs text-red-500 text-center mb-2">{errorMessage}</p>}

        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-teal-600 text-white px-4 py-2 mt-auto rounded-md text-sm hover:bg-teal-700 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Lihat Course
        </a>
      </div>
    </div>
  )
}
