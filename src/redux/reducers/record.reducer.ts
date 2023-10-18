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
  },
});

export const {addCompletedId} = recordSlice.actions;
export default recordSlice.reducer;
