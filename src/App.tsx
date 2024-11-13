import { ReactNode, useState } from "react";
import ProfessionSelector from "./components/ProfessionSelector";
import episodes from './assets/episode-professions.json'
import { Profession } from "./lib/types/Profession";

export default function App(): ReactNode {
  const [profession, setProfession] = useState<Profession | null>(null)

  return (
    <div className="h-full flex items-center justify-center">
      <div className="p-16 border-solid border-2 border-primary-foreground rounded-md drop-shadow-md bg-secondary flex flex-col items-center justify-center gap-y-2">
        <p className="text-sm font-semibold"> (debug) Selected profession: {profession?.display ?? "None"}</p>
        <div className="grid grid-rows-4 divide-y divide-dotted divide-secondary-foreground">
          {episodes.map(episode => <ProfessionSelector key={episode.identifier} episode={episode} onSelectProfession={setProfession} />)}
        </div>
      </div>
    </div>
  )
}