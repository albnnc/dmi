import { processorFamilies } from "../../constants/processor_families.ts";
import { processorTypes } from "../../constants/processor_types.ts";
import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseProcessorStructure(bytes: number[]): Structure {
  const strings = getStructureStrings(bytes);
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const socketDesignation = strings[bytes[4] - 1];
  const processorType = (
    processorTypes as Record<string, string>
  )[bytes[5]];
  const processorFamily = (
    processorFamilies as Record<string, string>
  )[bytes[6]];
  const processorManufacturer = strings[bytes[7] - 1];
  const processorVersion = strings[bytes[16] - 1];
  const serialNumber = strings[bytes[32] - 1];
  const assetTag = strings[bytes[33] - 1];
  const partNumber = strings[bytes[34] - 1];
  return {
    type: "PROCESSOR" as const,
    handle,
    socketDesignation,
    processorType,
    processorFamily,
    processorManufacturer,
    processorVersion,
    serialNumber,
    assetTag,
    partNumber,
  };
}
