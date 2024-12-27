import { memoryErrorGranularities } from "../../constants/memory_error_granularities.ts";
import { memoryErrorOperations } from "../../constants/memory_error_operations.ts";
import { memoryErrorTypes } from "../../constants/memory_error_types.ts";
import type { SixtyFourBitMemoryErrorStructure } from "../../types/64_bit_memory_error_structure.ts";

export function parse64BitMemoryErrorStructure(
  bytes: number[],
): SixtyFourBitMemoryErrorStructure {
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
    // 0x00000000 means unknown value.
    return dataView.getUint32(0, true) || undefined;
  })();
  const memoryArrayErrorAddress = (() => {
    const dataView = new DataView(new ArrayBuffer(8));
    dataView.setUint8(0, bytes[11]);
    dataView.setUint8(1, bytes[12]);
    dataView.setUint8(2, bytes[13]);
    dataView.setUint8(3, bytes[14]);
    dataView.setUint8(4, bytes[15]);
    dataView.setUint8(5, bytes[16]);
    dataView.setUint8(6, bytes[17]);
    dataView.setUint8(7, bytes[18]);
    const value = dataView.getBigUint64(0, true);
    return value === unknownQwordAddress ? undefined : value;
  })();
  const deviceErrorAddress = (() => {
    const dataView = new DataView(new ArrayBuffer(8));
    dataView.setUint8(0, bytes[19]);
    dataView.setUint8(1, bytes[20]);
    dataView.setUint8(2, bytes[21]);
    dataView.setUint8(3, bytes[22]);
    dataView.setUint8(4, bytes[23]);
    dataView.setUint8(5, bytes[24]);
    dataView.setUint8(6, bytes[25]);
    dataView.setUint8(7, bytes[26]);
    const value = dataView.getBigUint64(0, true);
    return value === unknownQwordAddress ? undefined : value;
  })();
  const errorResolution = (() => {
    const dataView = new DataView(new ArrayBuffer(4));
    dataView.setUint8(0, bytes[19]);
    dataView.setUint8(1, bytes[20]);
    dataView.setUint8(2, bytes[21]);
    dataView.setUint8(3, bytes[22]);
    const value = dataView.getUint32(0, true);
    return BigInt(value) === unknownDwordAddress ? undefined : value;
  })();
  return {
    type: "64_BIT_MEMORY_ERROR" as const,
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

const unknownDwordAddress = BigInt("0x80000000");
const unknownQwordAddress = BigInt("0x8000000000000000");
