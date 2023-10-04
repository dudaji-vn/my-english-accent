import store from '../reducers';
import {FC, ReactNode} from 'react';
import {Provider} from 'react-redux';
interface IStores {
  children: ReactNode;
}
const Stores: FC<IStores> = props => {
  const {children} = props;
  return <Provider store={store}>{children}</Provider>;
};

export default Stores;
