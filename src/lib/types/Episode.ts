import { Displayable } from "./Displayable";
import { Identifiable } from "./Identifiable";
import { Profession } from "./Profession";

export interface Episode extends Identifiable, Displayable {
  professions: Profession[]
}