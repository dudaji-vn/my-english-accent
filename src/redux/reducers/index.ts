import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import userReducer from './user.reducer';
import {IUserStore} from '../interface/IUserStore';

export interface IRootSate {
  user: IUserStore;
}

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export const useRootSelector = <T>(
  selector: (state: IRootSate) => T,
  defaultValue?: T,
): T | undefined => {
  try {
    const value = useSelector(selector);
    return value || defaultValue;
  } catch (error) {
    return defaultValue;
  }
};
export default store;