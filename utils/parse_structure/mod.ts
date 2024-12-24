import type { Structure } from "../../types/structure.ts";
import { getStructureType } from "../get_structure_type.ts";
import { parseBiosStructure } from "./ _bios.ts";
import { parseBaseboardStructure } from "./_baseboard.ts";
import { parseChassisStructure } from "./_chassis.ts";
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
};

export function parseStructure(bytes: number[]): Structure {
  const type = getStructureType(bytes);
  const parseStructure = structureParsers[type];
  return parseStructure?.(bytes) ?? { type };
}
