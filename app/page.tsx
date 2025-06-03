import { Search } from "lucide-react"
import CourseCard from "@/components/course-card"
import FilterSidebar from "@/components/filter-sidebar"
import MobileFilters from "@/components/mobile-filters"

interface Course {
  id: number
  course_title: string
  subject: string
  level: string
  url: string
  is_paid: boolean
  price: number
}

async function getCourses(): Promise<Course[]> {
  const res = await fetch("https://dev-nc-api.f3h.net/api/courses/random?n=9", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Gagal mengambil data kursus")
  }

  const json = await res.json()
  return json.data ? json.data : json
}

export default async function Home() {
  const courses = await getCourses()

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

            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center border-2 rounded-full px-4 py-2 bg-white shadow-sm">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search for courses, skills, or subjects..."
                  className="flex-1 outline-none text-gray-700"
                />
                <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 mx-auto max-w-6xl py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Recommended for you</h2>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:hidden mb-6">
            <MobileFilters />
          </div>

          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
