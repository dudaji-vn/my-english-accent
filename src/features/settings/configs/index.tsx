import {Language, Role} from '../../../types/user';

import {Content} from '../components/radio-card';
import {Image} from 'native-base';
import React from 'react';

const designerImg = require('../../../assets/images/Designer.png');
const devImg = require('../../../assets/images/Dev.png');
const otherImg = require('../../../assets/images/Other.png');
const KRFlag = require('../../../assets/images/KoreanFlagIcon.png');
const VNFlag = require('../../../assets/images/VietNamFlagIcon.png');

export const nationals: {
  content: Content;
  value: Language;
}[] = [
  {
    content: {
      name: 'Korea',
      icon: <Image w={8} h={8} alt="Korean flag" source={KRFlag} />,
    },
    value: 'ko',
  },
  {
    content: {
      name: 'Vietnam',
      icon: <Image w={8} h={8} alt="Vietnamese flag" source={VNFlag} />,
    },
    value: 'vi',
  },
];

export const positions: {
  content: Content;
  value: Role;
}[] = [
  {
    content: {
      name: 'Developer',
      icon: <Image w={10} h={10} alt="Developer icon" source={devImg} />,
    },
    value: 'developer',
  },
  {
    content: {
      name: 'Designer',
      icon: <Image w={10} h={10} alt="Designer icon" source={designerImg} />,
    },
    value: 'designer',
  },
  {
    content: {
      name: 'Others',
      icon: <Image w={10} h={10} alt="Other icon" source={otherImg} />,
    },
    value: 'others',
  },
];
