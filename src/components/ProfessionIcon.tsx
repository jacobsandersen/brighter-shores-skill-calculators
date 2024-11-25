import { Episode } from "@/lib/types/Episode";
import { Profession } from "@/lib/types/Profession";
import { ReactNode } from "react";

export type ProfessionIconProps = {
  episode: Episode,
  profession: Profession
  heightPx?: number
  widthPx?: number
}

export default function ProfessionIcon({ episode, profession, heightPx = 30, widthPx = 30 }: ProfessionIconProps): ReactNode {
  return (
    <img 
      src={`/profession-icons/${episode.identifier}/${profession.identifier}.webp`} 
      style={{ height: `${heightPx}px`, width: `${widthPx}px` }} 
      alt={`Icon for ${profession.display} in ${episode.display}`} 
    />
  )
}