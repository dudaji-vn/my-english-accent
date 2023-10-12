import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const AddIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#4080FF"
      d="M11.69 6.975a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z"
    />
    <Path
      fill="#4080FF"
      fillRule="evenodd"
      d="M.69 11.975c0-6.076 4.925-11 11-11s11 4.924 11 11c0 6.075-4.925 11-11 11s-11-4.925-11-11Zm11-9a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AddIcon;
