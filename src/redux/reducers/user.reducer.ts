import {createSlice} from '@reduxjs/toolkit';
import {IUserStore} from '../interface/IUserStore';

const initialState: IUserStore = {
  email: '',
  avatar: '',
  userId: '',
  isAuthenticated: false,
};

const userSlice: any = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIsAuthenticate: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {setUser, setIsAuthenticate} = userSlice.actions;
export default userSlice.reducer;
