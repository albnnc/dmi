import type { ThirtyTwoBitMemoryErrorStructure } from "./32_bit_memory_error_structure.ts";
import type { SixtyFourBitMemoryErrorStructure } from "./64_bit_memory_error_structure.ts";
import type { GenericStructure } from "./base_structure.ts";
import type { BaseboardStructure } from "./baseboard_structure.ts";
import type { BiosStructure } from "./bios_structure.ts";
import type { ChassisStructure } from "./chassis_structure.ts";
import type { MemoryDeviceStructure } from "./memory_device_structure.ts";
import type { ProcessorStructure } from "./processor_structure.ts";
import type { StructureType } from "./structure_type.ts";
import type { SystemStructure } from "./system_structure.ts";

type StrictStructure =
  | BiosStructure
  | SystemStructure
  | BaseboardStructure
  | ChassisStructure
  | ProcessorStructure
  | MemoryDeviceStructure
  | ThirtyTwoBitMemoryErrorStructure
  | SixtyFourBitMemoryErrorStructure;

export type Structure =
  | StrictStructure
  | GenericStructure & {
    type: Exclude<StructureType, StrictStructure["type"]>;
  };
