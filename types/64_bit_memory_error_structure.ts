import type { GenericStructure } from "./base_structure.ts";

export interface SixtyFourBitMemoryErrorStructure extends GenericStructure {
  type: "64_BIT_MEMORY_ERROR";
  errorType?: string;
  errorGranularity?: string;
  errorOperation?: string;
  vendorSyndrome?: number;
  memoryArrayErrorAddress?: bigint;
  deviceErrorAddress?: bigint;
  errorResolution?: number;
}
