import { ReactNode } from "react";

import episodes from '@/assets/episode-professions.json'
import ProfessionSelector from "./ProfessionSelector";
import { Profession } from "@/lib/types/Profession";

export type ProfessionMenuProps = {
  onSelectProfession: (profession: Profession) => void
}

export default function ProfessionMenu({ onSelectProfession }: ProfessionMenuProps): ReactNode {
  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <h1 className="text-lg font-semibold">Brighter Shores Skill Calculator</h1>
        <p className="text-sm font-light">Heya! I made this tool with that hope that it is helpful. I'll keep working on it to make it better and better over time.</p>
      </div>
      <div className="grid grid-rows-4 divide-y divide-dotted divide-secondary-foreground">
        {episodes.map(episode => <ProfessionSelector key={episode.identifier} episode={episode} onSelectProfession={onSelectProfession} />)}
      </div>
      <p className="text-sm font-light">
        Did I help make your life a little easier? <a href="https://ko-fi.com/jacobandersen" className="underline text-accent-foreground" target="_blank">Maybe buy me a coffee?</a> (If you want to. You don't have to. But it'd sure be cool if you did.)
      </p>
    </div>
  )
}