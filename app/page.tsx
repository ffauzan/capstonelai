import { cookies } from "next/headers" 
import { Search, TrendingUp } from "lucide-react" // Menambahkan ikon TrendingUp
import CourseCard from "@/components/course-card"
import FilterSidebar from "@/components/filter-sidebar"
import MobileFilters from "@/components/mobile-filters"
import SearchBar from "@/components/search-bar"

const API_BASE_URL = "https://dev-nc-api.f3h.net";
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

// Subject mapping
const subjects = [
  "Business Finance",
  "Graphic Design",
  "Web Development",
  "Musical Instruments",
];

const subjectToNum: Record<string, number> = Object.fromEntries(
  subjects.map((subject, index) => [subject, index + 1])
);

const subjectToWord: Record<number, string> = Object.fromEntries(
  subjects.map((subject, index) => [index + 1, subject])
);

// Level mapping
const levels = [
  "Beginner Level",
  "Intermediate Level",
  "Expert Level",
  "All Levels"
];

const levelToNum: Record<string, number> = Object.fromEntries(
  levels.map((level, index) => [level, index + 1])
);

const levelToWord: Record<number, string> = Object.fromEntries(
  levels.map((level, index) => [index + 1, level])
);

async function getRecommendedCourses(): Promise<Course[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Get user profile
  const endpoint = `${API_BASE_URL}/me`;
  const fetchOptions: RequestInit = {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: "no-store"
  };
  try {
    const res = await fetch(endpoint, fetchOptions);
    if (!res.ok) {
      console.error("Gagal mengambil data profil:", res.statusText);
      return [];
    }

    const json = await res.json();

    const usedInCollaborative = json.data.user.used_in_collaborative;

    if (!usedInCollaborative) {
      // Harusnya bisa menyesuaikan hasil onboarding
      console.warn("User tidak menggunakan fitur collaborative, mengembalikan kursus populer.");
      return getMainCourses(token, undefined, undefined, undefined, undefined);
    }
    
    // Ambil rekomendasi kursus berdasarkan user_id
    const coursesEndpoint = `${API_BASE_URL}/api/courses/recommender3?&n=20`;
    const coursesRes = await fetch(coursesEndpoint, fetchOptions);
    
    if (!coursesRes.ok) {
      console.error("Gagal mengambil data rekomendasi kursus:", coursesRes.statusText);
      return [];
    }
    
    const coursesJson = await coursesRes.json();
    return coursesJson.data || [];
  } catch (error) {
    console.error("Error saat fetch data rekomendasi kursus:", error);
    return [];
  }

}

// PERBAIKAN FINAL: Fungsi ini sekarang menerima nilai filter sebagai argumen primitif individual
async function getMainCourses(
  token: string | undefined,
  subject?: string,
  level?: string,
  is_paid?: string,
  title?: string
): Promise<Course[]> {
  const apiBaseUrl = "https://dev-nc-api.f3h.net";
  const fetchOptions: RequestInit = { cache: "no-store" };
  let endpoint = "";

  const queryParams = new URLSearchParams();
  if (subject) queryParams.set('subject', subject);
  if (level) queryParams.set('level', level);
  if (is_paid) queryParams.set('is_paid', is_paid);
  if (title) queryParams.set('title', title);
  
  const hasFilters = queryParams.toString() !== "";

  // Logika endpoint yang diperbaiki
  if (hasFilters) {
    endpoint = `${apiBaseUrl}/api/courses?${queryParams.toString()}&page=1&per_page=54&order_by=num_subscribers&order_direction=desc`;
  // } else if (token) {
  //   endpoint = `${apiBaseUrl}/api/courses/recommender3?n=9`;
  //   fetchOptions.headers = { 'Authorization': `Bearer ${token}` };
  } else {
    endpoint = `${apiBaseUrl}/api/courses?page=1&per_page=54&order_by=num_subscribers&order_direction=desc`;
  }

  try {
    const res = await fetch(endpoint, fetchOptions);
    if (!res.ok) {
      console.error(`Gagal mengambil data dari ${endpoint}:`, res.statusText);
      if (token && !hasFilters) return getMainCourses(undefined, undefined, undefined, undefined, undefined);
      return [];
    }
    const json = await res.json();
    if (endpoint.includes("/api/courses?")) {
      return json.data.courses || [];
    }
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home({
  searchParams
}: {
  // Definisikan tipe searchParams secara eksplisit
  searchParams: { subject?: string; level?: string; is_paid?: string; title?: string }
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Await searchParams to ensure it is resolved before accessing its properties
  const { subject, level, is_paid, title } = await Promise.resolve(searchParams);

  // Ambil data dengan meneruskan variabel individual, bukan objek searchParams
  const [mainCourses, recommendedCourses] = await Promise.all([
    getMainCourses(token, subject, level, is_paid, title),
    token ? getRecommendedCourses() : Promise.resolve([]) 
  ]);

  const hasFilters = !!(subject || level || is_paid || title);

  const recommendationTitle = hasFilters
    ? "Top Courses"
    : token
    ? "Top Courses"
    : "Top Courses";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section (tidak ada perubahan) */}
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
      
      {recommendedCourses.length > 0 && (
        <section className="container px-4 mx-auto max-w-6xl py-8">
            <div className="flex items-center mb-6 space-x-3">
                <TrendingUp className="h-7 w-7 text-gray-800" />
                <h2 className="text-2xl font-bold text-gray-900">Recommended Courses Just For You 💓</h2>
            </div>
            <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
                {recommendedCourses.map((course) => (
                   <div key={`trending-${course.id}`} className="flex-shrink-0 w-80">
                        <CourseCard course={course} />
                   </div>
                ))}
            </div>
        </section>
      )}

      {/* Main Content (tidak ada perubahan) */}
      <div className="container px-4 mx-auto max-w-6xl py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{recommendationTitle}</h2>
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:hidden mb-6"><MobileFilters /></div>
          <div className="hidden lg:block"><FilterSidebar /></div>
          <div className="lg:col-span-3">
            {mainCourses.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg">
                <p className="text-gray-600">{hasFilters ? "Tidak ada kursus yang cocok dengan filter Anda." : "Tidak ada rekomendasi saat ini."}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
