"use client";

import { Search, ChevronDown, Edit, Trash2, GamepadIcon, Users, CheckCircle, Clock } from "lucide-react"

type Game = {
  id: number
  name: string
  genre: string 
  status: "Release" | "Upcoming"
  releaseDate: string
}

export default function GameManagement() {
  // Sample game data
  const games: Game[] = [
    {
      id: 1,
      name: "Stellar Quest",
      genre: "Action RPG",
      status: "Release",
      releaseDate: "Jan 15, 2025",
    },
    {
      id: 2,
      name: "Stellar Quest",
      genre: "Action RPG",
      status: "Upcoming",
      releaseDate: "Jan 15, 2025",
    },
    {
      id: 3,
      name: "Stellar Quest",
      genre: "Action RPG",
      status: "Upcoming",
      releaseDate: "Jan 15, 2025",
    },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Game Management</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="bg-blue-600 rounded-lg px-4 py-2 flex items-center gap-2">
              <span>Genre</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="bg-blue-600 rounded-lg px-4 py-2 flex items-center gap-2">
              <span>+ Add Game</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {/* Total Games Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm md:text-base">Total Games</h3>
              <div className="bg-blue-900/50 p-2 rounded-lg">
                <GamepadIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold">246</p>
          </div>

          {/* Total Players Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm md:text-base">Total Players</h3>
              <div className="bg-indigo-900/50 p-2 rounded-lg">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold">1.2M</p>
          </div>

          {/* Released Games Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm md:text-base">Released Games</h3>
              <div className="bg-green-900/50 p-2 rounded-lg">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold">228</p>
          </div>

          {/* Upcoming Games Card */}
          <div className="bg-[#111c2e] rounded-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-400 text-sm md:text-base">Upcoming Games</h3>
              <div className="bg-yellow-900/50 p-2 rounded-lg">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
              </div>
            </div>
            <p className="text-2xl md:text-4xl font-bold">18</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search games by name..."
              aria-label="Search games"
              className="w-full bg-[#111c2e] border border-gray-700 rounded-lg py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 min-w-5" />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-[#111c2e] border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#1a2b4b] transition-colors">
              <span>Genre</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="bg-[#111c2e] border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#1a2b4b] transition-colors">
              <span>Status</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="bg-[#111c2e] border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-[#1a2b4b] transition-colors">
              <span>By Date</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Games Table */}
        <div className="bg-[#111c2e] rounded-lg overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Game</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Genre</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Release Date</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id} className="border-b border-gray-700 last:border-b-0">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{game.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{game.genre}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          game.status === "Release"
                            ? "bg-green-900/30 text-green-400"
                            : "bg-yellow-900/30 text-yellow-400"
                        }`}
                      >
                        {game.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">{game.releaseDate}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-4">
                        <button className="text-gray-400 hover:text-white">
                          <Edit className="h-5 w-5" />
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
