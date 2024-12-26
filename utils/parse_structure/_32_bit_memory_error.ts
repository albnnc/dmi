import { memoryErrorGranularities } from "../../constants/memory_error_granularities.ts";
import { memoryErrorOperations } from "../../constants/memory_error_operations.ts";
import { memoryErrorTypes } from "../../constants/memory_error_types.ts";
import type { Structure } from "../../types/structure.ts";

export function parse32BitMemoryErrorStructure(bytes: number[]): Structure {
  const numericErrorType = bytes[4];
  const numericErrorGranularity = bytes[5];
  const numericErrorOperation = bytes[6];
  // 0x00000000 vendor syndrome is unknown.
  const vendorSyndrome = parseInt(
    [bytes[7], bytes[8], bytes[9], bytes[10]]
      .reverse()
      .map((i) => i.toString(16).padStart(2, "0"))
      .join(""),
    16,
  ) || undefined;
  const memoryArrayErrorAddress = parseInt(
    [bytes[11], bytes[12], bytes[13], bytes[14]]
      .reverse()
      .map((i) => i.toString(16).padStart(2, "0"))
      .join(""),
    16,
  );
  const deviceErrorAddress = parseInt(
    [bytes[15], bytes[16], bytes[17], bytes[18]]
      .reverse()
      .map((i) => i.toString(16).padStart(2, "0"))
      .join(""),
    16,
  );
  const errorResolution = parseInt(
    [bytes[19], bytes[20], bytes[21], bytes[22]]
      .reverse()
      .map((i) => i.toString(16).padStart(2, "0"))
      .join(""),
    16,
  );
  return {
    type: "32_BIT_MEMORY_ERROR" as const,
    errorType: (memoryErrorTypes as Record<string, string>)[
      numericErrorType.toString()
    ] ?? "UNKNOWN",
    errorGranularity: (memoryErrorGranularities as Record<string, string>)[
      numericErrorGranularity.toString()
    ] ?? "UNKNOWN",
    errorOperation: (memoryErrorOperations as Record<string, string>)[
      numericErrorOperation.toString()
    ] ?? "UNKNOWN",
    vendorSyndrome,
    memoryArrayErrorAddress: memoryArrayErrorAddress === unknownAddress
      ? undefined
      : memoryArrayErrorAddress,
    deviceErrorAddress: deviceErrorAddress === unknownAddress
      ? undefined
      : deviceErrorAddress,
    errorResolution: errorResolution === unknownAddress
      ? undefined
      : errorResolution,
  };
}

const unknownAddress = parseInt("80000000", 16);
