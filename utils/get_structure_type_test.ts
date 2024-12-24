import { assertEquals } from "@std/assert";
import * as path from "@std/path";
import { getStructureByteArrays } from "./get_structure_byte_arrays.ts";
import { getStructureType } from "./get_structure_type.ts";

Deno.test("get structure type", async () => {
  const bytes = await Deno.readFile(
    path.fromFileUrl(import.meta.resolve("../assets/dmi_b")),
  );
  const [structureBytes] = getStructureByteArrays(bytes);
  const structureType = getStructureType(structureBytes);
  assertEquals(structureType, "BIOS");
});
