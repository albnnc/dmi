import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseBaseboardStructure(bytes: number[]): Structure {
  const strings = getStructureStrings(bytes);
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const manufacturer = strings[bytes[4] - 1];
  const product = strings[bytes[5] - 1];
  const version = strings[bytes[6] - 1];
  const serialNumber = strings[bytes[7] - 1];
  const assetTag = strings[bytes[8] - 1];
  return {
    type: "BASEBOARD" as const,
    handle,
    manufacturer,
    product,
    version,
    serialNumber,
    assetTag,
  };
}
