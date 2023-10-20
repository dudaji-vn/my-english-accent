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
  },
});

export const {togglePlayAll} = sliderSlice.actions;
export default sliderSlice.reducer;
