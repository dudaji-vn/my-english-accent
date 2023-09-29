import {NativeBaseProvider} from 'native-base';
import React from 'react';

export default function Providers({children}: {children: React.ReactNode}) {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
}
