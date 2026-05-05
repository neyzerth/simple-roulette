import { useItems } from '@/contexts/ItemsContext';
import Svg, { Circle, Text } from 'react-native-svg';
import { assignSliceColors, Slice, SLICE_COLORS } from './Slice';

interface Props {
    size?: number;
}

const Wheel = ({ size = 300 }: Props) => {
    const items = useItems().items;
    const radius = size / 2;

    if (items.length <= 1) {
        return <Svg width={size} height={size}>
            <Circle cx={radius} cy={radius} r={radius} strokeWidth={1} stroke={SLICE_COLORS[0]} fill={SLICE_COLORS[0]} fillOpacity={0.4} />
            <Text
                x={size / 2}
                y={size / 2 + 5}
                fill="black"
                fontSize="25"
                textAnchor="middle"
            >
                {items[0] || "Add items to spin!"}
            </Text>
        </Svg>;
    }

    const angle = 360 / items.length;
    const colors = assignSliceColors(items.length);

    const slices = items.map((item: string, index: number) => {
        return <Slice
            key={index}
            index={index}
            text={item}
            angle={angle}
            radius={radius}
            color={colors[index]}
        />
    });

    return <Svg width={size} height={size}>{slices}</Svg>;
};

export default Wheel;
