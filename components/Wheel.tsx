import Svg, { Circle } from 'react-native-svg';
import { Slice } from './Slice';

interface Props {
    items: string[];
    size?: number;

}

const Wheel = ({ items, size = 300 }: Props) => {
    const radius = size / 2;
    if (items.length <= 1) {
        return <Svg width={size} height={size}>
            <Circle cx={radius} cy={radius} r={radius} fill={'#a6f'} />
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