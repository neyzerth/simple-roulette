export interface Point {
  x: number;
  y: number;
}

export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): Point => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const getWinnerIndex = (rotation: number, itemsLength: number): number => {
  const normalized = rotation % 360 - 90;
  const effectiveAngle = (360 - normalized) % 360;
  const sliceAngle = 360 / itemsLength;
  return Math.floor(effectiveAngle / sliceAngle);
};
