import type { GenericStructure } from "./base_structure.ts";

export interface MemoryDeviceStructure extends GenericStructure {
  type: "MEMORY_DEVICE";
  formFactor?: string;
  deviceLocator?: string;
  bankLocator?: string;
  manufacturer?: string;
  serialNumber?: string;
  assetTag?: string;
  partNumber?: string;
}
