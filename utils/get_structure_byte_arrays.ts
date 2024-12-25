export function getStructureByteArrays(
  bytes: number[] | Uint8Array,
): number[][] {
  const chunks: number[][] = [];
  for (let i = 0; i < bytes.length; ++i) {
    const type = bytes[i];
    const structSize = bytes[i + 1];
    if (!structSize) {
      break;
    }
    chunks.push([type, structSize]);
    const chunk = chunks[chunks.length - 1];
    const structEnd = i + structSize;
    for (i = i + 2; i < structEnd; ++i) {
      const byte = bytes[i];
      chunk.push(byte);
    }
    for (; true; ++i) {
      const byte = bytes[i];
      const nextByte = bytes[i + 1];
      if (!byte && !nextByte) {
        ++i;
        break;
      }
      chunk.push(byte);
    }
  }
  return chunks;
}
