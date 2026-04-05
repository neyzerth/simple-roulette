import { Path, Text } from "react-native-svg";

interface Props {
    index: number;
    text: string;
    angle: number;
    radius: number;

}

export const Slice = ({ index, text, angle, radius }: Props) => {

    const startAngle = index * angle;
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

    const color = randomColor(index);

    return <>
        <Path d={pathData} strokeWidth={1} stroke={color} fill={color + '6'} />
        <Text
            x={centerText.x}
            y={centerText.y}
            fill="black"
            fontSize="14"
            textAnchor="middle"
            transform={`rotate(${startAngle + angle * 2} ${centerText.x} ${centerText.y})`}
        >
            {text}
        </Text>
    </>
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

const randomColor = (index: number) => {
    const colors = [
        '#a6f',
        '#6af',
        '#fa6',
        '#6fa',
        '#af6'];
    return colors[index % colors.length];
}