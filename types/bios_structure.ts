import type { GenericStructure } from "./base_structure.ts";

export interface BiosStructure extends GenericStructure {
  type: "BIOS";
  vendor?: string;
  version?: string;
  biosStartingAddressSegment?: number;
  releaseDate?: string;
}
