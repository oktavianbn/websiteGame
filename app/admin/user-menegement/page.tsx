"use client";

import { Search, ChevronDown, Settings, Trash2, Users } from "lucide-react"

type User = {
  id: number
  name: string
  username: string
  email: string
  status: "Active" | "Suspended"
  joinDate: string
}

export default function UserManagement() {
  // Sample user data
  const users: User[] = [
    {
      id: 1,
      name: "Sarah Connorrr",
      username: "@sconnor",
      email: "sarah.connor@gmail.com",
      status: "Active",
      joinDate: "Jan 15, 2025",
    },
    {
      id: 2,
      name: "Sarah Connorrr",
      username: "@sconnor",
      email: "sarah.connor@gmail.com",
      status: "Suspended",
      joinDate: "Jan 15, 2025",
    },
    {
      id: 3,
      name: "Sarah Connorrr",
      username: "@sconnor",
      email: "sarah.connor@gmail.com",
      status: "Active",
      joinDate: "Jan 15, 2025",
    },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">User Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* Total Users Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm md:text-base">Total Users</h3>
              <div className="bg-indigo-900 p-2 rounded-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold">24,789</p>
          </div>

          {/* Active Users Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm md:text-base">Active Users</h3>
              <div className="bg-green-900/50 p-2 rounded-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-green-400">21,345</p>
          </div>

          {/* Suspended Users Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm md:text-base">Suspended Users</h3>
              <div className="bg-red-900/50 p-2 rounded-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-red-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold text-red-400">345</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search User"
              aria-label="Search users"
              className="w-full bg-[#111c2e] border border-gray-700 rounded-lg py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 min-w-5" />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#111c2e] border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2">
              <span>User Status</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="bg-[#111c2e] border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2">
              <span>By Date</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#111c2e] rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 font-medium text-gray-400">User</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Email</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Join Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700 last:border-b-0">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-gray-400">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.status === "Active" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">{user.joinDate}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-4">
                        <button className="text-gray-400 hover:text-white">
                          <Settings className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-red-400">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0 text-gray-400">Showing 1 to 10 of 24,789 entries</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#111c2e] rounded-md text-gray-400 hover:bg-[#1a2b4b]">Previous</button>
            <button className="px-4 py-2 bg-blue-600 rounded-md">1</button>
            <button className="px-4 py-2 bg-[#111c2e] rounded-md text-gray-400 hover:bg-[#1a2b4b]">2</button>
            <button className="px-4 py-2 bg-[#111c2e] rounded-md text-gray-400 hover:bg-[#1a2b4b]">3</button>
            <button className="px-4 py-2 bg-[#111c2e] rounded-md text-gray-400 hover:bg-[#1a2b4b]">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
