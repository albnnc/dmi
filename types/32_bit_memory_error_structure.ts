import type { GenericStructure } from "./base_structure.ts";
import type { MemoryErrorGranularity } from "./memory_error_granularity.ts";
import type { MemoryErrorOperation } from "./memory_error_operation.ts";
import type { MemoryErrorType } from "./memory_error_type.ts";

export interface ThirtyTwoBitMemoryErrorStructure extends GenericStructure {
  type: "32_BIT_MEMORY_ERROR";
  errorType: MemoryErrorType;
  errorGranularity: MemoryErrorGranularity;
  errorOperation: MemoryErrorOperation;
  vendorSyndrome?: number;
  memoryArrayErrorAddress?: number;
  deviceErrorAddress?: number;
  errorResolution?: number;
}
