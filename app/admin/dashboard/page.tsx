"use client"

import Image from "next/image"
import { PlusCircle, MinusCircle, AlertTriangle, Bug, Users, GamepadIcon } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Dashboard Overview</h1>
        <p className="text-gray-400 mb-4 md:mb-8">Welcome back, Admin!</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Admin Profile Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6 flex items-center gap-4">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Admin Avatar"
                width={60}
                height={60}
                className="rounded-full md:w-[80px] md:h-[80px]"
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1">
                <span className="text-xs font-bold text-black">ADMIN</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold">Admin</h3>
              <p className="text-blue-400 text-xs md:text-sm break-all">playportaloffice@gmail.com</p>
            </div>
          </div>

          {/* Total Users Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-blue-400 text-sm md:text-base">Total Users</h3>
              <div className="bg-indigo-900 p-2 rounded-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold">24,789</p>
          </div>

          {/* Total Games Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-blue-400 text-sm md:text-base">Total Games</h3>
              <div className="bg-indigo-900 p-2 rounded-lg">
                <GamepadIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold">1,245</p>
          </div>
        </div>

        {/* Activity and Bug Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Activities */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Recent Activities</h2>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 md:gap-4 bg-[#1a2b4b] p-3 md:p-4 rounded-lg">
                <div className="bg-blue-900 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <PlusCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">Added new game Cyber Realm</p>
                  <p className="text-xs md:text-sm text-gray-400">10 mins ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 bg-[#1a2b4b] p-3 md:p-4 rounded-lg">
                <div className="bg-red-900/50 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <MinusCircle className="h-4 w-4 md:h-5 md:w-5 text-red-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">Remove Game Corruptors Always Go Free</p>
                  <p className="text-xs md:text-sm text-gray-400">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 bg-[#1a2b4b] p-3 md:p-4 rounded-lg">
                <div className="bg-yellow-900/50 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">Username Policy Violation - Agntoso</p>
                  <p className="text-xs md:text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bug Reports */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Bug Reports</h2>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 md:gap-4 bg-[#1a2b4b] p-3 md:p-4 rounded-lg">
                <div className="bg-green-900/50 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <Bug className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">[Payment] - Transaksi Tidak Terverifikasi</p>
                  <p className="text-xs md:text-sm text-green-400 truncate">
                    Sudah Diperbaiki - Perbaikan berhasil diuji
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 bg-[#1a2b4b] p-3 md:p-4 rounded-lg">
                <div className="bg-blue-900/50 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <Bug className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">[Payment] - Transaksi Tidak Terverifikasi</p>
                  <p className="text-xs md:text-sm text-blue-400">Sedang Dicek</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4 bg-[#1a2b4b] p-3 md:p-4 rounded-lg">
                <div className="bg-yellow-900/50 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <Bug className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">[Payment] - Transaksi Tidak Terverifikasi</p>
                  <p className="text-xs md:text-sm text-yellow-400">Baru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
