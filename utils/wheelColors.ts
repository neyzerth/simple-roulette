export const SLICE_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#FFE66D',
  '#95E1D3',
  '#ef81f3',
  '#AA96DA',
];

/**
 * Assigns colors to slices with maximum variety while ensuring:
 * - Adjacent slices never have the same color
 * - 0-1 items use color index 0
 * - Uses all available colors in a balanced way
 */
export const assignSliceColors = (itemCount: number): string[] => {
  if (itemCount <= 1) {
    return [SLICE_COLORS[0]];
  }

  const colors: string[] = [];
  const numColors = SLICE_COLORS.length;

  for (let index = 0; index < itemCount; index++) {
    const leftNeighborIndex = (index - 1 + itemCount) % itemCount;
    const rightNeighborIndex = (index + 1) % itemCount;

    const leftNeighborColor = colors[leftNeighborIndex];
    const rightNeighborColor = colors[rightNeighborIndex];

    let colorIndex = index % numColors;
    let attempts = 0;

    while (attempts < numColors) {
      const candidateColor = SLICE_COLORS[colorIndex];
      if (candidateColor !== leftNeighborColor && candidateColor !== rightNeighborColor) {
        colors[index] = candidateColor;
        break;
      }
      colorIndex = (colorIndex + 1) % numColors;
      attempts++;
    }

    if (!colors[index]) {
      colors[index] = SLICE_COLORS[index % numColors];
    }
  }

  return colors;
};
