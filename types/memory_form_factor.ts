import type { memoryFormFactors } from "../constants/memory_form_factors.ts";

export type MemoryFormFactor =
  (typeof memoryFormFactors)[keyof typeof memoryFormFactors];
