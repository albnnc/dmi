import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseSystemStructure(bytes: number[]): Structure {
  const strings = getStructureStrings(bytes);
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const manufacturer = strings[bytes[4] - 1];
  const productName = strings[bytes[5] - 1];
  const version = strings[bytes[6] - 1];
  const serialNumber = strings[bytes[7] - 1];
  const skuNumber = strings[bytes[25] - 1];
  const family = strings[bytes[26] - 1];
  return {
    type: "SYSTEM" as const,
    handle,
    manufacturer,
    productName,
    version,
    serialNumber,
    skuNumber,
    family,
  };
}
