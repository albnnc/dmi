import type { memoryTypes } from "../constants/memory_types.ts";

export type MemoryType = (typeof memoryTypes)[keyof typeof memoryTypes];
