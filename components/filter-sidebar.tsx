'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Definisikan opsi filter yang sesuai dengan nilai di API Anda
const SUBJECT_OPTIONS = [
  { id: '1', name: 'Business Finance' },
  { id: '2', name: 'Graphic Design' },
  { id: '3', name: 'Web Development' },
  { id: '4', name: 'Musical Instruments' },
];

const LEVEL_OPTIONS = [
  { id: '1', name: 'Beginner Level' },
  { id: '2', name: 'Intermediate Level' },
  { id: '3', name: 'Expert Level' },
  { id: '4', name: 'All Levels' },
];

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State untuk menyimpan filter yang dipilih
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    subject: searchParams.get('subject')?.split(',') || [],
    level: searchParams.get('level')?.split(',') || [],
    is_paid: searchParams.get('is_paid')?.split(',') || [],
  });

  // Fungsi untuk menangani perubahan pada checkbox
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value) // Hapus jika sudah ada
        : [...currentValues, value]; // Tambah jika belum ada
      
      return { ...prev, [filterType]: newValues };
    });
  };

  // Fungsi untuk mereset semua filter
  const handleReset = () => {
    setSelectedFilters({ subject: [], level: [], is_paid: [] });
    router.push(pathname); // Navigasi ke URL tanpa parameter
  };

  // useEffect untuk memperbarui URL saat filter berubah
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(','));
      }
    });

    // Gunakan timeout untuk menunda navigasi (debounce), mengurangi request berlebihan
    const debounceTimeout = setTimeout(() => {
      router.push(`${pathname}?${params.toString()}`);
    }, 300); // Tunda 300ms setelah klik terakhir

    // Bersihkan timeout jika ada perubahan baru sebelum 300ms
    return () => clearTimeout(debounceTimeout);
  }, [selectedFilters, pathname, router]);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        <button onClick={handleReset} className="text-sm text-teal-600 hover:underline">Reset</button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "level", "price"]}>
        {/* Filter Kategori/Subjek */}
        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Subject</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {SUBJECT_OPTIONS.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`subject-${option.id}`}
                    checked={selectedFilters.subject.includes(option.id)}
                    onCheckedChange={() => handleFilterChange('subject', option.id)}
                  />
                  <label htmlFor={`subject-${option.id}`} className="text-sm font-medium leading-none cursor-pointer">
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Filter Level */}
        <AccordionItem value="level">
          <AccordionTrigger className="text-base font-medium">Difficulty Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {LEVEL_OPTIONS.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${option.id}`}
                    checked={selectedFilters.level.includes(option.id)}
                    onCheckedChange={() => handleFilterChange('level', option.id)}
                  />
                  <label htmlFor={`level-${option.id}`} className="text-sm font-medium leading-none cursor-pointer">
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Filter Harga */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
               <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="price-free"
                    checked={selectedFilters.is_paid.includes('0')}
                    onCheckedChange={() => handleFilterChange('is_paid', '0')}
                  />
                  <label htmlFor="price-free" className="text-sm font-medium leading-none cursor-pointer">
                    FREE
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="price-paid"
                    checked={selectedFilters.is_paid.includes('1')}
                    onCheckedChange={() => handleFilterChange('is_paid', '1')}
                  />
                  <label htmlFor="price-paid" className="text-sm font-medium leading-none cursor-pointer">
                    Berbayar
                  </label>
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
