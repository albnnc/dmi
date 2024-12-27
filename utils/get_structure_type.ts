import { structureTypes } from "../constants/structure_types.ts";
import type { StructureType } from "../types/structure_type.ts";

export function getStructureType(bytes: number[]): StructureType {
  const type = (
    structureTypes as Record<string, StructureType | undefined>
  )[bytes[0]];
  if (!type) {
    throw new Error(`Unknown structure type: ${bytes[0]}`);
  }
  return type;
}
