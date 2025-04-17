import GameCard from "@/components/element/game-card";
import GameGrid from "@/components/element/game-grid";
import { games } from "@/lib/game";
import { Search } from "lucide-react";

export default function Games() {

    return (
        <main>

            <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-center text-white px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Discover Your Next Gaming Adventure
                </h1>
                <p className="text-sm md:text-base text-slate-300 mb-6">
                    Your portal to endless gaming possibilities
                </p>

                <div className="flex w-full max-w-md items-center bg-slate-800 rounded-md px-4 py-2 mb-4 focus-within:ring-2 focus-within:ring-cyan-500">
                    <input
                        type="text"
                        placeholder="Search games, genres, or publishers..."
                        className="bg-transparent w-full text-white placeholder-slate-400 focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-cyan-400" />
                </div>

                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-2 rounded-md transition">
                    Browse All Games
                </button>
            </div>
            import GameGrid from "@/components/GameGrid"

            <div className="w-full overflow-x-auto">
                <div className="flex gap-6 py-4 px-2">
                    {games.map((game) => (
                        <div key={game.id} className="flex-shrink-0 w-72">
                            <GameCard game={game} />
                        </div>
                    ))}
                </div>
            </div>


        </main>
    )

}