import {IUserStore} from '../interface/IUserStore';
import {User} from '../../types/user';
import {createSlice} from '@reduxjs/toolkit';

export interface ISliderStore {
  isPlayAll?: boolean;
}
const initialState: ISliderStore = {
  isPlayAll: false,
};

const sliderSlice: any = createSlice({
  name: 'slider',
  initialState: initialState,
  reducers: {
    togglePlayAll: (state, action) => {
      return {
        ...state,
        isPlayAll: !state.isPlayAll,
      };
    },
    turnOffPlayAll: (state, action) => {
      return {
        ...state,
        isPlayAll: false,
      };
    },
  },
});

export const {togglePlayAll, turnOffPlayAll} = sliderSlice.actions;
export default sliderSlice.reducer;
