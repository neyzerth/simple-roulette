import { useItems } from '@/contexts/ItemsContext';
import { useThemeStyles } from '@/styles/useThemeStyles';
import Svg, { Circle, Text } from 'react-native-svg';
import { assignSliceColors } from '@/utils/wheelColors';
import { WheelSlice } from './WheelSlice';

interface WheelProps {
  size?: number;
}

const Wheel = ({ size = 300 }: WheelProps) => {
  const { items } = useItems();
  const { presets } = useThemeStyles();
  const radius = size / 2;

  if (items.length <= 1) {
    return (
      <Svg width={size} height={size}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          strokeWidth={1}
          stroke={presets.card.borderColor}
          fill={presets.card.backgroundColor}
        />
        <Text
          x={size / 2}
          y={size / 2 + 5}
          fill={presets.text.muted.color}
          fontSize="18"
          fontWeight="500"
          textAnchor="middle"
        >
          {items[0] || 'Add items to spin!'}
        </Text>
      </Svg>
    );
  }

  const angle = 360 / items.length;
  const sliceColors = assignSliceColors(items.length);

  const slices = items.map((item, index) => (
    <WheelSlice
      key={`${item}-${index}`}
      index={index}
      text={item}
      angle={angle}
      radius={radius}
      color={sliceColors[index]}
    />
  ));

  return <Svg width={size} height={size}>{slices}</Svg>;
};

export default Wheel;
