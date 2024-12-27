import type { memoryErrorGranularities } from "../constants/memory_error_granularities.ts";

export type MemoryErrorGranularity =
  (typeof memoryErrorGranularities)[keyof typeof memoryErrorGranularities];
