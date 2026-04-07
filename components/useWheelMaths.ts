export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export const getWinnerIndex = (rotation: number, itemsLength: number) => {
    const normalized = rotation % 360;
    const effectiveAngle = (360 - normalized) % 360;

    // Used when the pointer is at the top (0 degrees)
    // we want to consider it as 360 degrees for easier calculations
    const adjustedAngle = (effectiveAngle + 0) % 360;

    const sliceAngle = 360 / itemsLength;

    return Math.floor(adjustedAngle / sliceAngle);
};