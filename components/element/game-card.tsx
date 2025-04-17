import { Game } from '@/lib/game'
import Image from 'next/image'

export default function GameCard({ game }: { game: Game }) {
  return (
    <div className="bg-[#0a0c10] text-white rounded-lg overflow-hidden shadow-md w-full max-w-xs">
      <Image
        src={game.image}
        alt={game.title}
        width={300}
        height={180}
        className="w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{game.title}</h2>
        <p className="text-sm text-gray-400">{game.genre}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-cyan-400">{game.price}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded">View Details</button>
        </div>
      </div>
    </div>
  )
}
