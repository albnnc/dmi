import { processorFamilies } from "../../constants/processor_families.ts";
import { processorTypes } from "../../constants/processor_types.ts";
import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseProcessorStructure(bytes: number[]): Structure {
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const socketDesignationStringIndex = bytes[4] - 1;
  const numericProcessorType = bytes[5];
  const numericProcessorFamily = bytes[6];
  const processorManufacturerStringIndex = bytes[7] - 1;
  const processorVersionStringIndex = bytes[16] - 1;
  const serialNumberStringIndex = bytes[32] - 1;
  const assetTagStringIndex = bytes[33] - 1;
  const partNumberStringIndex = bytes[34] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "PROCESSOR" as const,
    handle,
    socketDesignation: strings[socketDesignationStringIndex],
    processorType: (
      processorTypes as Record<string, string>
    )[numericProcessorType.toString()] ?? "UNKNOWN",
    processorFamily: (
      processorFamilies as Record<string, string>
    )[numericProcessorFamily.toString()] ?? "UNKNOWN",
    processorManufacturer: strings[processorManufacturerStringIndex],
    processorVersion: strings[processorVersionStringIndex],
    serialNumber: strings[serialNumberStringIndex],
    assetTag: strings[assetTagStringIndex],
    partNumber: strings[partNumberStringIndex],
  };
}
