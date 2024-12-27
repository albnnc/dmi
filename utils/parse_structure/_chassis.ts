import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseChassisStructure(bytes: number[]): Structure {
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const manufacturerStringIndex = bytes[4] - 1;
  const versionStringIndex = bytes[6] - 1;
  const serialNumberStringIndex = bytes[7] - 1;
  const assetTagStringIndex = bytes[8] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "CHASSIS" as const,
    handle,
    manufacturer: strings[manufacturerStringIndex],
    version: strings[versionStringIndex],
    serialNumber: strings[serialNumberStringIndex],
    assetTag: strings[assetTagStringIndex],
  };
}
