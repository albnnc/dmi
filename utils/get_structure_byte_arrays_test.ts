import { assertEquals } from "@std/assert";
import * as path from "@std/path";
import { getStructureByteArrays } from "./get_structure_byte_arrays.ts";

Deno.test("get structure byte arrays", async () => {
  const bytes = await Deno.readFile(
    path.fromFileUrl(import.meta.resolve("../assets/dmi_b")),
  );
  const structureByteArrays = getStructureByteArrays(bytes);
  assertEquals(structureByteArrays.length, 53);
});
