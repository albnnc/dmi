import { getStructureStrings } from "../get_structure_strings.ts";

export function parseProcessorStructure(bytes: number[]) {
  const socketDesignationStringIndex = bytes[4] - 1;
  const processorManufacturerStringIndex = bytes[7] - 1;
  const processorVersionStringIndex = bytes[16] - 1;
  const serialNumberStringIndex = bytes[32] - 1;
  const assetTagStringIndex = bytes[33] - 1;
  const partNumberStringIndex = bytes[34] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "PROCESSOR" as const,
    socketDesignation: strings[socketDesignationStringIndex],
    processorManufacturer: strings[processorManufacturerStringIndex],
    processorVersion: strings[processorVersionStringIndex],
    serialNumber: strings[serialNumberStringIndex],
    assetTag: strings[assetTagStringIndex],
    partNumber: strings[partNumberStringIndex],
  };
}
