import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseBiosStructure(bytes: number[]): Structure {
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const vendorStringIndex = bytes[4] - 1;
  const versionStringIndex = bytes[5] - 1;
  const releaseDateStringIndex = bytes[8] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "BIOS" as const,
    handle,
    vendor: strings[vendorStringIndex],
    version: strings[versionStringIndex],
    releaseDate: strings[releaseDateStringIndex]
      ? new Date(strings[releaseDateStringIndex]).toISOString()
      : undefined,
  };
}
