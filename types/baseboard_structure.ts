import type { GenericStructure } from "./base_structure.ts";

export interface BaseboardStructure extends GenericStructure {
  type: "BASEBOARD";
  manufacturer?: string;
  product?: string;
  version?: string;
  serialNumber?: string;
  assetTag?: string;
}
