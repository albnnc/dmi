import type { GenericStructure } from "./base_structure.ts";

export interface ThirtyTwoBitMemoryErrorStructure extends GenericStructure {
  type: "32_BIT_MEMORY_ERROR";
  errorType?: string;
  errorGranularity?: string;
  errorOperation?: string;
  vendorSyndrome?: number;
  memoryArrayErrorAddress?: number;
  deviceErrorAddress?: number;
  errorResolution?: number;
}
