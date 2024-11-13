import { ReactNode } from "react";
import ProfessionIcon from "./ProfessionIcon";
import { Episode } from "@/lib/types/Episode";
import { Profession } from "@/lib/types/Profession";

export type ProfessionSelectorProps = {
  episode: Episode,
  onSelectProfession: (profession: Profession) => void
}

export default function ProfessionSelector({ episode, onSelectProfession }: ProfessionSelectorProps): ReactNode {
  return (
    <div className="py-4 first:pt-0 last:pb-0 flex flex-col items-center justify-center gap-y-3">
      <h1 className="text-lg font-semibold">{episode.display}</h1>
      <div className="flex gap-x-2 items-center justify-evenly">
        {episode.professions.map((profession) => (
          <ProfessionIcon key={`${episode.identifier}-${profession.identifier}`} episode={episode} profession={profession} onClick={onSelectProfession} />
        ))}
      </div>
    </div>
  )
}