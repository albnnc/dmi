import type { StructureType } from "./structure_type.ts";

export interface Structure {
  type: StructureType;
  [key: string]: string | number | bigint | undefined;
}
