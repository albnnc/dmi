import type { structureTypes } from "../constants/structure_types.ts";

export type StructureType =
  | (typeof structureTypes)[keyof typeof structureTypes]
  | "UNKNOWN";
