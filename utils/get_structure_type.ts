import { structureTypes } from "../constants/structure_types.ts";
import type { StructureType } from "../types/structure_type.ts";

export function getStructureType(bytes: number[]): StructureType {
  const numericType = bytes[0];
  return (
    (
      structureTypes as Record<string, string>
    )[numericType.toString()] ?? "UNKNOWN"
  ) as StructureType;
}

//░░░░█─────────────█──▀──
//░░░░▓█───────▄▄▀▀█──────
////░░░░▒░█────▄█▒░░▄░█─────
//░░░░░░░▀▄─▄▀▒▀▀▀▄▄▀─HEY─
//░░░░░░░░░█▒░░░░▄▀─LIL───
//█████▒▒░░█░░░▀▄──FELLA──
//███▓▓▒▒▒▀▀▀█▄░░░░█──────
//▓██▓▒▒▒▒▒▒▒▒▒█░░░░█─────
//▓▓█▓▒▒▒▒▒▒▓▒▒█░░░░░█────
//░▒▒▀▀▄▄▄▄█▄▄▀░░░░░░░█─
