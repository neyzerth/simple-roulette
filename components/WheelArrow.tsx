import Svg, { Polygon, Circle, Defs, Filter, FeDropShadow } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';

export const WheelArrow = () => {
  const { colors } = useTheme();
  
  return (
    <Svg width={50} height={70} viewBox="0 0 50 70">
      <Defs>
        <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <FeDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </Filter>
      </Defs>
      
      {/* Outer pointer shape */}
      <Polygon
        points="25,68 5,18 45,18"
        fill={colors.arrow}
        stroke="#C0392B"
        strokeWidth="2"
        filter="url(#shadow)"
      />
      
      {/* Inner highlight for 3D effect */}
      <Polygon
        points="25,62 12,22 38,22"
        fill="#EC7063"
      />
      
      {/* Circular base/pin */}
      <Circle
        cx={25}
        cy={14}
        r={10}
        fill={colors.arrow}
        stroke="#C0392B"
        strokeWidth="2"
        filter="url(#shadow)"
      />
      
      {/* Inner circle highlight */}
      <Circle
        cx={25}
        cy={12}
        r={5}
        fill="#EC7063"
      />
    </Svg>
  );
};
