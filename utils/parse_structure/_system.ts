import { getStructureStrings } from "../get_structure_strings.ts";

export function parseSystemStructure(bytes: number[]) {
  const manufacturerStringIndex = bytes[4] - 1;
  const productNameStringIndex = bytes[5] - 1;
  const versionStringIndex = bytes[6] - 1;
  const serialNumberStringIndex = bytes[7] - 1;
  const skuNumberStringIndex = bytes[25] - 1;
  const familyStringIndex = bytes[26] - 1;
  const strings = getStructureStrings(bytes);
  return {
    type: "SYSTEM" as const,
    manufacturerStringIndex: strings[manufacturerStringIndex],
    productNameStringIndex: strings[productNameStringIndex],
    version: strings[versionStringIndex],
    serialNumber: strings[serialNumberStringIndex],
    skuNumber: strings[skuNumberStringIndex],
    family: strings[familyStringIndex],
  };
}
