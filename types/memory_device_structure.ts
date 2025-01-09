import type { GenericStructure } from "./base_structure.ts";
import type { MemoryFormFactor } from "./memory_form_factor.ts";
import type { MemoryType } from "./memory_type.ts";

export interface MemoryDeviceStructure extends GenericStructure {
  type: "MEMORY_DEVICE";
  size?: number;
  formFactor?: MemoryFormFactor;
  deviceLocator?: string;
  bankLocator?: string;
  memoryType?: MemoryType;
  speed?: number;
  manufacturer?: string;
  serialNumber?: string;
  assetTag?: string;
  partNumber?: string;
  extendedSize?: number;
  configuredMemorySpeed?: number;
  minimumVoltage?: number;
  maximumVoltage?: number;
  configuredVoltage?: number;
}
