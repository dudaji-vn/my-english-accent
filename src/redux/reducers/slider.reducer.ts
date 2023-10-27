import {IUserStore} from '../interface/IUserStore';
import {User} from '../../types/user';
import {createSlice} from '@reduxjs/toolkit';

export interface ISliderStore {
  isPlayAll?: boolean;
  currentUserIndex?: number;
}
const initialState: ISliderStore = {
  isPlayAll: false,
  currentUserIndex: 0,
};

const sliderSlice: any = createSlice({
  name: 'slider',
  initialState: initialState,
  reducers: {
    setCurrentUserIndex: (state, action) => {
      return {
        ...state,
        currentUserIndex: action.payload,
      };
    },
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

export const {
  togglePlayAll,
  turnOffPlayAll,
  toggleRerender,
  setCurrentUserIndex,
} = sliderSlice.actions;
export default sliderSlice.reducer;
