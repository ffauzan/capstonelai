import { cookies } from "next/headers" 
import CourseCard from "@/components/course-card"
import FilterSidebar from "@/components/filter-sidebar"
import MobileFilters from "@/components/mobile-filters"
import SearchBar from "@/components/search-bar"

// Tipe data tetap sama
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

// 1. Modifikasi fungsi getCourses untuk menerima parameter filter
async function getCourses(
  token: string | undefined,
  searchParams: { [key: string]: string | string[] | undefined }
): Promise<Course[]> {
  const apiBaseUrl = "https://dev-nc-api.f3h.net"
  const fetchOptions: RequestInit = { cache: "no-store" }
  let endpoint = ""

  const queryParams = new URLSearchParams()
  // Tambahkan semua searchParams ke query
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, Array.isArray(value) ? value.join(',') : value);
    }
  });
  
  const hasFilters = queryParams.toString() !== "";

  // Logika untuk menentukan endpoint
  if (hasFilters) {
    endpoint = `${apiBaseUrl}/api/courses?${queryParams.toString()}`
  } else if (token) {
    endpoint = `${apiBaseUrl}/api/courses?${queryParams.toString()}`
    fetchOptions.headers = { 'Authorization': `Bearer ${token}` }
  } else {
    endpoint = `${apiBaseUrl}/api/courses?${queryParams.toString()}`
  }

  try {
    const res = await fetch(endpoint, fetchOptions)

    if (!res.ok) {
      console.error(`Gagal mengambil data dari ${endpoint}:`, res.statusText)
      // Fallback jika recommender gagal
      if (token && !hasFilters) return getCourses(undefined, {})
      return []
    }

    const json = await res.json()
    // Endpoint /api/courses dan /recommender3 punya struktur berbeda
    if (hasFilters) {
      return json.data.courses || []
    }
    return json.data.courses || []
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  // 2. Kirim searchParams ke fungsi getCourses
  const courses = await getCourses(token, searchParams)
  
  const hasFilters = Object.keys(searchParams).length > 0;

  // 3. Tentukan judul berdasarkan status login dan filter
  const recommendationTitle = hasFilters
    ? "Hasil Filter Kursus"
    : token
    ? "Top Courses"
    : "Kursus Pilihan Untukmu"

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 border-b">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              NextCourse – The Next Step Starts Here
            </h1>
            <p className="text-teal-600 font-medium text-lg mb-4">
              Personalized Course Recommender
            </p>
            <p className="text-gray-600 mb-8 text-lg">
              Find the perfect courses tailored to your interests and career goals
            </p>

            <SearchBar />

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 mx-auto max-w-6xl py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{recommendationTitle}</h2>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:hidden mb-6">
            <MobileFilters />
          </div>

          <div className="hidden lg:block">
            {/* 4. FilterSidebar sekarang akan menjadi komponen interaktif */}
            <FilterSidebar />
          </div>

          <div className="lg:col-span-3">
            {courses.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg">
                <p className="text-gray-600">{hasFilters ? "Tidak ada kursus yang cocok dengan filter Anda." : "Tidak ada rekomendasi saat ini. Jelajahi lebih banyak kursus!"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
