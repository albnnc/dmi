import type { Structure } from "../../types/structure.ts";
import { getStructureType } from "../get_structure_type.ts";
import { parse32BitMemoryErrorStructure } from "./_32_bit_memory_error.ts";
import { parse64BitMemoryErrorStructure } from "./_64_bit_memory_error.ts";
import { parseBaseboardStructure } from "./_baseboard.ts";
import { parseBiosStructure } from "./_bios.ts";
import { parseChassisStructure } from "./_chassis.ts";
import { parseGenericStructure } from "./_generic.ts";
import { parseMemoryDeviceStructure } from "./_memory_device.ts";
import { parseProcessorStructure } from "./_processor.ts";
import { parseSystemStructure } from "./_system.ts";

const structureParsers: Record<
  string,
  ((bytes: number[]) => Structure) | undefined
> = {
  "BIOS": parseBiosStructure,
  "SYSTEM": parseSystemStructure,
  "CHASSIS": parseChassisStructure,
  "BASEBOARD": parseBaseboardStructure,
  "PROCESSOR": parseProcessorStructure,
  "MEMORY_DEVICE": parseMemoryDeviceStructure,
  "32_BIT_MEMORY_ERROR": parse32BitMemoryErrorStructure,
  "64_BIT_MEMORY_ERROR": parse64BitMemoryErrorStructure,
};

export function parseStructure(bytes: number[]): Structure {
  const type = getStructureType(bytes);
  return (
    structureParsers[type]?.(bytes) ??
      parseGenericStructure(bytes) as Structure
  );
}
