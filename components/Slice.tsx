import { Path, Text } from "react-native-svg";
import { polarToCartesian } from "./useWheelMaths";

interface Props {
    index: number;
    text: string;
    angle: number;
    radius: number;
}

const SLICE_COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#FFE66D',
    '#95E1D3',
    '#F38181',
    '#AA96DA',
];

export const Slice = ({ index, text, angle, radius }: Props) => {
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

    const color = SLICE_COLORS[index % SLICE_COLORS.length];

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