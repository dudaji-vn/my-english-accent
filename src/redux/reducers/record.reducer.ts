import {createSlice} from '@reduxjs/toolkit';
import {IRecordStore} from '../interface/IRecordStore';

const initialState: IRecordStore = {
  completedIds: [],
};

const recordSlice: any = createSlice({
  name: 'record',
  initialState: initialState,
  reducers: {
    addCompletedId: (state: IRecordStore, action: any) => {
      state.completedIds.push(action.payload);
    },
    removeCompletedId: (state: IRecordStore, action: any) => {
      state.completedIds = state.completedIds.filter(
        (id: string) => id !== action.payload,
      );
    },
  },
});

export const {addCompletedId, removeCompletedId} = recordSlice.actions;
export default recordSlice.reducer;
