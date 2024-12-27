import { memoryErrorGranularities } from "../../constants/memory_error_granularities.ts";
import { memoryErrorOperations } from "../../constants/memory_error_operations.ts";
import { memoryErrorTypes } from "../../constants/memory_error_types.ts";
import type { Structure } from "../../types/structure.ts";

export function parse32BitMemoryErrorStructure(bytes: number[]): Structure {
  const handle = (() => {
    const dataView = new DataView(new ArrayBuffer(2));
    dataView.setUint8(0, bytes[2]);
    dataView.setUint8(1, bytes[3]);
    return dataView.getUint16(0, true);
  })();
  const errorType = (
    memoryErrorTypes as Record<string, string>
  )[bytes[4]];
  const errorGranularity = (
    memoryErrorGranularities as Record<string, string>
  )[bytes[5]];
  const errorOperation = (
    memoryErrorOperations as Record<string, string>
  )[bytes[6]];
  const vendorSyndrome = (() => {
    const dataView = new DataView(new ArrayBuffer(4));
    dataView.setUint8(0, bytes[7]);
    dataView.setUint8(1, bytes[8]);
    dataView.setUint8(2, bytes[9]);
    dataView.setUint8(3, bytes[10]);
    // 0x00000000 vendor syndrome is unknown.
    return dataView.getUint32(0, true) || undefined;
  })();
  const memoryArrayErrorAddress = (() => {
    const dataView = new DataView(new ArrayBuffer(4));
    dataView.setUint8(0, bytes[11]);
    dataView.setUint8(1, bytes[12]);
    dataView.setUint8(2, bytes[13]);
    dataView.setUint8(3, bytes[14]);
    const value = dataView.getUint32(0, true);
    return value === unknownAddress ? undefined : value;
  })();
  const deviceErrorAddress = (() => {
    const dataView = new DataView(new ArrayBuffer(4));
    dataView.setUint8(0, bytes[15]);
    dataView.setUint8(1, bytes[16]);
    dataView.setUint8(2, bytes[17]);
    dataView.setUint8(3, bytes[18]);
    const value = dataView.getUint32(0, true);
    return value === unknownAddress ? undefined : value;
  })();
  const errorResolution = (() => {
    const dataView = new DataView(new ArrayBuffer(4));
    dataView.setUint8(0, bytes[19]);
    dataView.setUint8(1, bytes[20]);
    dataView.setUint8(2, bytes[21]);
    dataView.setUint8(3, bytes[22]);
    const value = dataView.getUint32(0, true);
    return value === unknownAddress ? undefined : value;
  })();
  return {
    type: "32_BIT_MEMORY_ERROR" as const,
    handle,
    errorType,
    errorGranularity,
    errorOperation,
    vendorSyndrome,
    memoryArrayErrorAddress,
    deviceErrorAddress,
    errorResolution,
  };
}

const unknownAddress = parseInt("80000000", 16);
