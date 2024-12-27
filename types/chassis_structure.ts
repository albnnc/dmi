import type { GenericStructure } from "./base_structure.ts";

export interface ChassisStructure extends GenericStructure {
  type: "CHASSIS";
  manufacturer?: string;
  version?: string;
  serialNumber?: string;
  assetTag?: string;
}
