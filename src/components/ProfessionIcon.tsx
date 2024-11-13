import { Episode } from "@/lib/types/Episode";
import { Profession } from "@/lib/types/Profession";
import { ReactNode } from "react";

export type ProfessionIconProps = {
  episode: Episode,
  profession: Profession,
  onClick: (profession: Profession) => void
}

export default function ProfessionIcon({ episode, profession, onClick }: ProfessionIconProps): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center gap-y-1 hover:cursor-grab active:cursor-grabbing" onClick={() => onClick(profession)}>
      <img src={`/profession-icons/${episode.identifier}/${profession.identifier}.webp`} style={{ height: '30px', width: '30px' }} alt={`Icon for ${profession} in ${episode.display}`} />
      <h2 className="text-sm font-semibold">{profession.display}</h2>
    </div>
  )
}