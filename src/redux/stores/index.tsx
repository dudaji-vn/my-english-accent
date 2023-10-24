import store, {persistor} from '../reducers';
import {FC, ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import React from 'react';

interface IStores {
  children: ReactNode;
}
const Stores: FC<IStores> = props => {
  const {children} = props;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Stores;
