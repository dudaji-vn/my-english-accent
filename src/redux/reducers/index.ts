import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import userReducer from './user.reducer';
import {IUserStore} from '../interface/IUserStore';
import recordReducer from './record.reducer';
import {IRecordStore} from '../interface/IRecordStore';
import sliderReducer, {ISliderStore} from './slider.reducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

export interface IRootSate {
  user: IUserStore;
  record: IRecordStore;
  slider: ISliderStore;
}

const rootReducer = combineReducers({
  user: userReducer,
  record: recordReducer,
  slider: sliderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
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
export const persistor = persistStore(store);
