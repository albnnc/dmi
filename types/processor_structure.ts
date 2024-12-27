import type { GenericStructure } from "./base_structure.ts";

export interface ProcessorStructure extends GenericStructure {
  type: "PROCESSOR";
  socketDesignation: string;
  processorType: string;
  processorFamily?: string;
  processorManufacturer?: string;
  processorVersion?: string;
  serialNumber?: string;
  assetTag?: string;
  partNumber?: string;
}
