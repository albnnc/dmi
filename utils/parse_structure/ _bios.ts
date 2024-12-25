import { getStructureStrings } from "../get_structure_strings.ts";

export function parseBiosStructure(bytes: number[]) {
  const vendorStringIndex = bytes[4] - 1;
  const versionStringIndex = bytes[5] - 1;
  const releaseDateStringIndex = bytes[8] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "BIOS" as const,
    vendor: strings[vendorStringIndex],
    version: strings[versionStringIndex],
    releaseDate: strings[releaseDateStringIndex]
      ? new Date(strings[releaseDateStringIndex]).toISOString()
      : undefined,
  };
}
