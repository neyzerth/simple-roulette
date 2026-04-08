import { useItems } from '@/contexts/ItemsContext';
import Svg, { Circle, Text } from 'react-native-svg';
import { Slice } from './Slice';

interface Props {
    size?: number;
}

const Wheel = ({ size = 300 }: Props) => {
    const items = useItems().items;

    const radius = size / 2;
    if (items.length <= 1) {
        return <Svg width={size} height={size}>
            <Circle cx={radius} cy={radius} r={radius}
                strokeWidth={1} stroke={'#a6f'} fill={'#a6f6'} />
            <Text
                x={size / 2}
                y={size / 2 + 5}
                fill="black"
                fontSize="25"
                textAnchor="middle"
            // transform={`rotate(${startAngle + angle * 5} ${centerText.x} ${centerText.y})`}
            >
                {items[0] || "Add items to spin!"}
            </Text>
        </Svg>;
    }
    const angle = 360 / items.length;

    const slices = items.map((item: string, index: number) => {
        return <Slice
            key={index}
            index={index}
            text={item}
            angle={angle}
            radius={radius}
        />
    });

    return <Svg width={size} height={size}>{slices}</Svg>;
};



export default Wheel;