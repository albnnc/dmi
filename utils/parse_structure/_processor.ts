import { processorFamilies } from "../../constants/processor_families.ts";
import { processorTypes } from "../../constants/processor_types.ts";
import type { ProcessorStructure } from "../../types/processor_structure.ts";
import type { ProcessorType } from "../../types/processor_type.ts";
import { getStructureStrings } from "../get_structure_strings.ts";

export function parseProcessorStructure(bytes: number[]): ProcessorStructure {
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
  )[bytes[5]] as ProcessorType;
  const processorFamily = (
    processorFamilies as Record<string, string>
  )[bytes[6]];
  const processorManufacturer = strings[bytes[7] - 1];
  const processorVersion = strings[bytes[16] - 1];
  const externalClock = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[18]);
    dataView.setUint8(1, bytes[19]);
    const value = dataView.getUint16(0, true);
    return value || undefined;
  })();
  const maxSpeed = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[20]);
    dataView.setUint8(1, bytes[21]);
    const value = dataView.getUint16(0, true);
    return value || undefined;
  })();
  const currentSpeed = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[22]);
    dataView.setUint8(1, bytes[23]);
    const value = dataView.getUint16(0, true);
    return value || undefined;
  })();
  const serialNumber = strings[bytes[32] - 1];
  const assetTag = strings[bytes[33] - 1];
  const partNumber = strings[bytes[34] - 1];
  const coreCount = bytes[35] || undefined;
  const coreEnabled = bytes[36] || undefined;
  const threadCount = bytes[37] || undefined;
  return {
    type: "PROCESSOR" as const,
    handle,
    socketDesignation,
    processorType,
    processorFamily,
    processorManufacturer,
    processorVersion,
    externalClock,
    maxSpeed,
    currentSpeed,
    serialNumber,
    assetTag,
    partNumber,
    coreCount,
    coreEnabled,
    threadCount,
  };
}
