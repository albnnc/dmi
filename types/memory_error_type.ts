import type { memoryErrorTypes } from "../constants/memory_error_types.ts";

export type MemoryErrorType =
  | (typeof memoryErrorTypes)[keyof typeof memoryErrorTypes]
  | "UNKNOWN";
