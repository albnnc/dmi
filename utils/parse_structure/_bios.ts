import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseBiosStructure(bytes: number[]): Structure {
  const strings = getStructureStrings(bytes);
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const vendor = strings[bytes[4] - 1];
  const version = strings[bytes[5] - 1];
  const biosStartingAddressSegment = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[6]);
    dataView.setUint8(1, bytes[7]);
    // 0x0000 means unknown value.
    return dataView.getUint16(0, true) || undefined;
  })();
  const releaseDate = strings[bytes[8] - 1];
  return {
    type: "BIOS" as const,
    handle,
    vendor,
    version,
    biosStartingAddressSegment,
    releaseDate,
  };
}
