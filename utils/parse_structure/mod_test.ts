import * as path from "@std/path";
import { getStructureByteArrays } from "../get_structure_byte_arrays.ts";
import { parseStructure } from "./mod.ts";

Deno.test("parse structure", async () => {
  const bytes = await Deno.readFile(
    path.fromFileUrl(import.meta.resolve("../../assets/dmi_b")),
  );
  const structureByteArrays = getStructureByteArrays(bytes);
  const structures = structureByteArrays.map(parseStructure);
  console.log(structures);
});
