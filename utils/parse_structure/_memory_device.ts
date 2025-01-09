import type { MemoryDeviceStructure } from "../../types/memory_device_structure.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseMemoryDeviceStructure(
  bytes: number[],
): MemoryDeviceStructure {
  const strings = getStructureStrings(bytes);
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const size = (() => {
    const value = bytes[12];
    return (value === 0 || value === parseInt("FFFF", 16)) ? undefined : value;
  })();
  const formFactor = strings[bytes[14] - 1];
  const deviceLocator = strings[bytes[16] - 1];
  const bankLocator = strings[bytes[17] - 1];
  const manufacturer = strings[bytes[23] - 1];
  const serialNumber = strings[bytes[24] - 1];
  const assetTag = strings[bytes[25] - 1];
  const partNumber = strings[bytes[26] - 1];
  const extendedSize = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[28]);
    dataView.setUint8(1, bytes[29]);
    const value = dataView.getUint16(0, true);
    return value === 0 ? undefined : value;
  })();
  return {
    type: "MEMORY_DEVICE" as const,
    handle,
    size,
    formFactor,
    deviceLocator,
    bankLocator,
    manufacturer,
    serialNumber,
    assetTag,
    partNumber,
    extendedSize,
  };
}
