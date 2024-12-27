import type { memoryErrorOperations } from "../constants/memory_error_operations.ts";

export type MemoryErrorOperation =
  (typeof memoryErrorOperations)[keyof typeof memoryErrorOperations];
