import { useItems } from '@/contexts/ItemsContext';
import Svg, { Circle, Text } from 'react-native-svg';
import { assignSliceColors, SLICE_COLORS } from '@/utils/wheelColors';
import { WheelSlice } from './WheelSlice';

interface WheelProps {
  size?: number;
}

const Wheel = ({ size = 300 }: WheelProps) => {
  const { items } = useItems();
  const radius = size / 2;

  if (items.length <= 1) {
    return (
      <Svg width={size} height={size}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          strokeWidth={1}
          stroke={SLICE_COLORS[0]}
          fill={SLICE_COLORS[0]}
          fillOpacity={0.4}
        />
        <Text
          x={size / 2}
          y={size / 2 + 5}
          fill="black"
          fontSize="25"
          textAnchor="middle"
        >
          {items[0] || 'Add items to spin!'}
        </Text>
      </Svg>
    );
  }

  const angle = 360 / items.length;
  const colors = assignSliceColors(items.length);

  const slices = items.map((item, index) => (
    <WheelSlice
      key={`${item}-${index}`}
      index={index}
      text={item}
      angle={angle}
      radius={radius}
      color={colors[index]}
    />
  ));

  return <Svg width={size} height={size}>{slices}</Svg>;
};

export default Wheel;
