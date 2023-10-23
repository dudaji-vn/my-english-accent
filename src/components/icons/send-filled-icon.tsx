import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const SendFilledIcon = (props: SvgProps) => (
  <Svg width={24} height={25} fill="none" {...props}>
    <Path
      fill="#4080FF"
      fillRule="evenodd"
      d="M22.707 1.793a1 1 0 0 1 .237 1.037l-7 20a1 1 0 0 1-1.858.076l-3.844-8.648-8.648-3.844a1 1 0 0 1 .076-1.858l20-7a1 1 0 0 1 1.037.237Zm-1.91 2.889a.692.692 0 1 0-.979-.98l-7.615 7.616a.692.692 0 1 0 .979.98l7.615-7.616Z"
      clipRule="evenodd"
    />
  </Svg>
);
