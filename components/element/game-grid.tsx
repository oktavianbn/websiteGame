import GameCard from "./game-card"
import { games } from "../../lib/game"

export default function GameGrid() {
  return (
    <div className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}
