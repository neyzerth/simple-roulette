import Svg, { Polygon } from 'react-native-svg';

export const WheelArrow = () => (
  <Svg width={50} height={50}>
    <Polygon points="25,45 5,1 45,1" fill="black" />
  </Svg>
);
