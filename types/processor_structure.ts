import type { GenericStructure } from "./base_structure.ts";
import type { ProcessorType } from "./processor_type.ts";

export interface ProcessorStructure extends GenericStructure {
  type: "PROCESSOR";
  socketDesignation?: string;
  processorType: ProcessorType;
  processorFamily?: string;
  processorManufacturer?: string;
  processorVersion?: string;
  serialNumber?: string;
  assetTag?: string;
  partNumber?: string;
}
