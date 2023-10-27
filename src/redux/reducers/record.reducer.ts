import {createSlice} from '@reduxjs/toolkit';
import {IRecordStore} from '../interface/IRecordStore';

const initialState: IRecordStore = {
  completedIds: [],
  failedUploads: [],
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
    addFailedUpload: (state: IRecordStore, action: any) => {
      state.failedUploads.push(action.payload);
    },
    removeFailedUpload: (state: IRecordStore, action: any) => {
      state.failedUploads = state.failedUploads.filter(
        (failedUpload: any) => failedUpload.recordUrl !== action.payload,
      );
    },
    removeAllFailedUpload: (state: IRecordStore) => {
      state.failedUploads = [];
    },
  },
});

export const {
  addCompletedId,
  removeCompletedId,
  addFailedUpload,
  removeFailedUpload,
  removeAllFailedUpload,
} = recordSlice.actions;
export default recordSlice.reducer;
