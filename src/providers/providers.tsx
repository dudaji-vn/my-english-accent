import NativeBaseProvider from './native-base-provider';
import React from 'react';
import ReactQueryProvider from './react-query-provider';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <ReactQueryProvider>
      <NativeBaseProvider>{children}</NativeBaseProvider>
    </ReactQueryProvider>
  );
}
