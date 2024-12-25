import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseBaseboardStructure(bytes: number[]): Structure {
  const manufacturerStringIndex = bytes[4] - 1;
  const productStringIndex = bytes[5] - 1;
  const versionStringIndex = bytes[6] - 1;
  const serialNumberStringIndex = bytes[7] - 1;
  const assetTagStringIndex = bytes[8] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "BASEBOARD" as const,
    manufacturerStringIndex: strings[manufacturerStringIndex],
    productStringIndex: strings[productStringIndex],
    version: strings[versionStringIndex],
    serialNumber: strings[serialNumberStringIndex],
    assetTag: strings[assetTagStringIndex],
  };
}
