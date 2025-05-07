import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CourseProps {
  id: string
  title: string
  provider: string
  rating: number
  reviewCount: number
  description: string
  image: string
  category: string
  level: string
  price: string
}

export default function CourseCard({ course }: { course: CourseProps }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative h-40 w-full">
        <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
            {course.category}
          </Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            {course.level}
          </Badge>
        </div>

        <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{course.provider}</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{course.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">{course.reviewCount} reviews</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">{course.price}</span>
          <button className="text-teal-600 font-medium text-sm hover:text-teal-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
