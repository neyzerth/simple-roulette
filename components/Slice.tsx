import { Path, Text } from "react-native-svg";
import { polarToCartesian } from "./useWheelMaths";

interface Props {
    index: number;
    text: string;
    angle: number;
    radius: number;
    color: string;
}

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
export function assignSliceColors(itemCount: number): string[] {
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

        // Try colors in a rotating pattern to maximize variety
        // Start from index % numColors to spread colors evenly
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

        // Fallback: use modulo-based assignment
        if (!colors[index]) {
            colors[index] = SLICE_COLORS[index % numColors];
        }
    }

    return colors;
}

export const Slice = ({ index, text, angle, radius, color }: Props) => {
    const startAngle = index * angle - 90;
    const endAngle = startAngle + angle;

    const start = polarToCartesian(radius, radius, radius, endAngle);
    const end = polarToCartesian(radius, radius, radius, startAngle);
    const centerText = polarToCartesian(radius, radius, radius / 2, startAngle + angle / 2);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = `
        M ${radius} ${radius}
        L ${start.x} ${start.y}
        A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
        Z
    `;

    return (
        <>
            <Path d={pathData} strokeWidth={1} stroke={color} fill={color} fillOpacity={0.4} />
            <Text
                x={centerText.x}
                y={centerText.y}
                fill="black"
                fontSize="14"
                textAnchor="middle"
                transform={`rotate(${startAngle + angle / 2 + 90} ${centerText.x} ${centerText.y})`}
            >
                {text}
            </Text>
        </>
    );
};
