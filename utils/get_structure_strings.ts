export function getStructureStrings(bytes: number[] | Uint8Array): string[] {
  const structSize = bytes[1];
  const strings: string[] = [];
  for (const byte of bytes.slice(structSize)) {
    if (byte) {
      if (!strings.length) {
        strings.push("");
      }
      strings[strings.length - 1] += String.fromCharCode(byte);
    } else {
      if (strings[strings.length - 1] === "") {
        strings.pop();
        break;
      }
      strings.push("");
    }
  }
  return strings;
}
