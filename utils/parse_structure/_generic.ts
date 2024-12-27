import type { GenericStructure } from "../../types/base_structure.ts";
import { getStructureType } from "../get_structure_type.ts";

export function parseGenericStructure(bytes: number[]): GenericStructure {
  const type = getStructureType(bytes);
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  return { type, handle };
}
