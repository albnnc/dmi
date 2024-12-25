import { assertEquals } from "@std/assert";
import * as path from "@std/path";
import { getStructureByteArrays } from "./get_structure_byte_arrays.ts";
import { getStructureStrings } from "./get_structure_strings.ts";

Deno.test("get structure strings", async () => {
  const bytes = await Deno.readFile(
    path.fromFileUrl(import.meta.resolve("../assets/dmi_b")),
  );
  const [structureBytes] = getStructureByteArrays(bytes);
  const structureStrings = getStructureStrings(structureBytes);
  assertEquals(
    structureStrings,
    ["American Megatrends International, LLC.", "F15", "08/10/2022"],
  );
});
