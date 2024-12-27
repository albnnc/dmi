import type { processorTypes } from "../constants/processor_types.ts";

export type ProcessorType =
  (typeof processorTypes)[keyof typeof processorTypes];
