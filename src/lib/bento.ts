// Bento layout shared by the server render and the client-side filter.
// Posts go into blocks of up to six; each block size has its own grid pattern
// (see PostGrid.astro) so every column in a block ends on the same line.
// Slot order: wide top slot (d), tall slot (c), then the small ones.
export const BLOCK_SIZE = 6;
export const SLOTS: Record<number, string[]> = {
  6: ['d', 'c', 'a', 'b', 'e', 'f'],
  5: ['d', 'c', 'a', 'b', 'e'],
  4: ['d', 'c', 'e', 'f'],
  3: ['d', 'c', 'e'],
  2: ['d', 'c'],
  1: ['d'],
};

export function chunk<T>(items: T[]): T[][] {
  const blocks: T[][] = [];
  for (let i = 0; i < items.length; i += BLOCK_SIZE) blocks.push(items.slice(i, i + BLOCK_SIZE));
  return blocks;
}
