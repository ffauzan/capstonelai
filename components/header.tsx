"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-md bg-teal-600 flex items-center justify-center text-white font-bold text-xl mr-2">
              LC
            </div>
            <span className="font-bold text-xl text-gray-900">LearnConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 font-medium hover:text-teal-600 transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-gray-900 font-medium hover:text-teal-600 transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-gray-900 font-medium hover:text-teal-600 transition-colors">
              About
            </Link>
            <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
              Login
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Sign Up</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-900 font-medium hover:text-teal-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="text-gray-900 font-medium hover:text-teal-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="text-gray-900 font-medium hover:text-teal-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex space-x-4 pt-2">
                <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 w-full">
                  Login
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700 w-full">Sign Up</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
