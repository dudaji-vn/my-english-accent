import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const SpeakerIconRound = (props: SvgProps) => (
  <Svg width={80} height={80} fill="none" {...props}>
    <Rect width={80} height={80} fill="#CCC" rx={40} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M39.142 26.317a2 2 0 0 1 1.134 1.802v23.763a2 2 0 0 1-3.25 1.561l-7.938-6.35H23a2 2 0 0 1-2-2V34.907a2 2 0 0 1 2-2h6.088l7.938-6.35a2 2 0 0 1 2.116-.241Zm-2.866 5.963-5.237 4.19a2 2 0 0 1-1.25.438H25v6.184h4.79a2 2 0 0 1 1.249.439l5.237 4.19V32.28ZM44.562 31.61a2 2 0 0 1 2.828-.048C49.693 33.788 51 36.822 51 40c0 3.178-1.307 6.212-3.61 8.438a2 2 0 1 1-2.78-2.876C46.149 44.075 47 42.072 47 40s-.851-4.075-2.39-5.562a2 2 0 0 1-.048-2.828Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M51.346 26.586a2 2 0 0 1 2.829 0 18.973 18.973 0 0 1 0 26.828 2 2 0 1 1-2.829-2.828 14.973 14.973 0 0 0 0-21.172 2 2 0 0 1 0-2.828Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SpeakerIconRound;
