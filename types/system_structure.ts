import type { GenericStructure } from "./base_structure.ts";

export interface SystemStructure extends GenericStructure {
  type: "SYSTEM";
  manufacturer?: string;
  productName?: string;
  version?: string;
  serialNumber?: string;
  skuNumber?: string;
  family?: string;
}
