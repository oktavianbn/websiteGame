"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, GamepadIcon, BellRing, Menu, X } from "lucide-react"
import { Inter } from "next/font/google"
import "../globals.css"

// Initialize Inter font with Latin subset
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`flex flex-col md:flex-row h-screen bg-[#0d1524] text-white overflow-hidden ${inter.className}`}>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-md p-1">
            <GamepadIcon className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold">Play Portal</h1>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-[#1a2b4b]">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-60 border-r border-gray-800 md:h-screen z-10 absolute md:relative bg-[#0d1524]`}
      >
        <div className="p-4 relative">
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-2 right-2 p-1 rounded-md hover:bg-[#1a2b4b] md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="hidden md:flex items-center gap-2 mb-8">
            <div className="bg-blue-600 rounded-md p-1">
              <GamepadIcon className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">Play Portal</h1>
          </div>

          <div className="text-sm text-gray-400 mb-2">Menu Settings</div>

          <nav className="space-y-1">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors border-l-2 ${
                pathname === "/admin/dashboard"
                  ? "bg-[#1a2b4b] border-[#3B82F6]"
                  : "text-gray-400 hover:bg-[#1a2b4b] border-transparent "
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/user-menegement"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors border-l-2 ${
                pathname === "/admin/user-menegement"
                  ? "bg-[#1a2b4b] border-[#3B82F6]"
                  : "text-gray-400 hover:bg-[#1a2b4b] border-transparent "
              }`}
            >
              <Users className="h-5 w-5" />
              <span>User Accounts</span>
            </Link>
            <Link
              href="/admin/game-menegement"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors border-l-2 ${
                pathname === "/admin/game-menegement"
                  ? "bg-[#1a2b4b] border-[#3B82F6]"
                  : "text-gray-400 hover:bg-[#1a2b4b] border-transparent "
              }`}
            >
              <GamepadIcon className="h-5 w-5" />
              <span>Game Management</span>
            </Link>
            <Link
              href="/admin/news&event"
              className={`flex items-center gap-3 p-3 rounded-md transition-colors border-l-2 ${
                pathname === "/admin/news&event"
                  ? "bg-[#1a2b4b] border-[#3B82F6]"
                  : "text-gray-400 hover:bg-[#1a2b4b] border-transparent "
              }`}
            >
              <BellRing className="h-5 w-5" />
              <span>Events & News</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
