import type { Structure } from "../../types/structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseMemoryDeviceStructure(bytes: number[]): Structure {
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const formFactorStringIndex = bytes[14] - 1;
  const deviceLocatorStringIndex = bytes[16] - 1;
  const bankLocatorStringIndex = bytes[17] - 1;
  const manufacturerStringIndex = bytes[23] - 1;
  const serialNumberStringIndex = bytes[24] - 1;
  const assetTagStringIndex = bytes[25] - 1;
  const partNumberStringIndex = bytes[26] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "MEMORY_DEVICE" as const,
    handle,
    formFactor: strings[formFactorStringIndex],
    deviceLocator: strings[deviceLocatorStringIndex],
    bankLocator: strings[bankLocatorStringIndex],
    manufacturer: strings[manufacturerStringIndex],
    serialNumber: strings[serialNumberStringIndex],
    assetTag: strings[assetTagStringIndex],
    partNumber: strings[partNumberStringIndex],
  };
}
