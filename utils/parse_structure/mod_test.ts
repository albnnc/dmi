import { assertEquals } from "@std/assert/equals";
import * as path from "@std/path";
import { getStructureByteArrays } from "../get_structure_byte_arrays.ts";
import { parseStructure } from "./mod.ts";

Deno.test("parse structure", async () => {
  const bytes = await Deno.readFile(
    path.fromFileUrl(import.meta.resolve("../../assets/dmi_b")),
  );
  const structureByteArrays = getStructureByteArrays(bytes);
  const structures = structureByteArrays.map(parseStructure);
  assertEquals(structures.filter((v) => v.type === "BIOS").length, 1);
  assertEquals(structures.filter((v) => v.type === "SYSTEM").length, 1);
  assertEquals(structures.filter((v) => v.type === "BASEBOARD").length, 1);
  assertEquals(structures.filter((v) => v.type === "CHASSIS").length, 1);
  assertEquals(structures.filter((v) => v.type === "PROCESSOR").length, 1);
  assertEquals(structures.filter((v) => v.type === "MEMORY_DEVICE").length, 4);
  // TODO: Add better checks.
});
