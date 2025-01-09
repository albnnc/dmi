import { memoryFormFactors } from "../../constants/memory_form_factors.ts";
import { memoryTypes } from "../../constants/memory_types.ts";
import type { MemoryDeviceStructure } from "../../types/memory_device_structure.ts";
import type { MemoryFormFactor } from "../../types/memory_form_factor.ts";
import type { MemoryType } from "../../types/memory_type.ts";
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
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[12]);
    dataView.setUint8(1, bytes[13]);
    const value = dataView.getUint16(0, true);
    if (
      value === 0 ||
      value === parseInt("FFFF", 16) ||
      value === parseInt("7FFF", 16)
    ) {
      return undefined;
    }
    return value;
  })();
  const formFactor = (
    memoryFormFactors as Record<string, string>
  )[bytes[14]] as MemoryFormFactor;
  const deviceLocator = strings[bytes[16] - 1];
  const bankLocator = strings[bytes[17] - 1];
  const memoryType = (
    memoryTypes as Record<string, string>
  )[bytes[18]] as MemoryType;
  const speed = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[21]);
    dataView.setUint8(1, bytes[22]);
    const value = dataView.getUint16(0, true);
    if (
      value === 0 ||
      value === parseInt("FFFF", 16)
    ) {
      return undefined;
    }
    return value;
  })();
  const manufacturer = strings[bytes[23] - 1];
  const serialNumber = strings[bytes[24] - 1];
  const assetTag = strings[bytes[25] - 1];
  const partNumber = strings[bytes[26] - 1];
  const extendedSize = (() => {
    const dataView = new DataView(new ArrayBuffer(4));
    dataView.setUint8(0, bytes[28]);
    dataView.setUint8(1, bytes[29]);
    dataView.setUint8(2, bytes[30]);
    dataView.setUint8(3, bytes[31]);
    const value = dataView.getUint32(0, true);
    if (value === 0) {
      return undefined;
    }
    return value;
  })();
  const configuredMemorySpeed = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[32]);
    dataView.setUint8(1, bytes[33]);
    const value = dataView.getUint16(0, true);
    if (
      value === 0 ||
      value === parseInt("FFFF", 16)
    ) {
      return undefined;
    }
    return value;
  })();
  const minimumVoltage = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[34]);
    dataView.setUint8(1, bytes[35]);
    const value = dataView.getUint16(0, true);
    return value || undefined;
  })();
  const maximumVoltage = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[36]);
    dataView.setUint8(1, bytes[37]);
    const value = dataView.getUint16(0, true);
    return value || undefined;
  })();
  const configuredVoltage = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[38]);
    dataView.setUint8(1, bytes[39]);
    const value = dataView.getUint16(0, true);
    return value || undefined;
  })();
  return {
    type: "MEMORY_DEVICE" as const,
    handle,
    size,
    formFactor,
    deviceLocator,
    bankLocator,
    memoryType,
    speed,
    manufacturer,
    serialNumber,
    assetTag,
    partNumber,
    extendedSize,
    configuredMemorySpeed,
    minimumVoltage,
    maximumVoltage,
    configuredVoltage,
  };
}
