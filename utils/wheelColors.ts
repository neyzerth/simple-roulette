/**
 * Rainbow color palette for wheel slices.
 * Bright, vibrant colors arranged in spectrum order.
 */
export const SLICE_COLORS = [
  '#FF0000', // Red
  '#FF4500', // Orange Red
  '#FF8C00', // Dark Orange
  '#FFD700', // Gold
  '#ADFF2F', // Green Yellow
  '#00FF00', // Lime
  '#00CED1', // Dark Turquoise
  '#1E90FF', // Dodger Blue
  '#4169E1', // Royal Blue
  '#8A2BE2', // Blue Violet
  '#9400D3', // Dark Violet
  '#FF1493', // Deep Pink
  '#FF69B4', // Hot Pink
  '#00FA9A', // Medium Spring Green
  '#20B2AA', // Light Sea Green
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
