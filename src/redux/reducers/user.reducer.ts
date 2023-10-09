import {IUserStore} from '../interface/IUserStore';
import {User} from '../../types/user';
import {createSlice} from '@reduxjs/toolkit';

const initialState: IUserStore = {
  email: '',
  avatar: '',
  userId: '',
  profile: {} as User,
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
    updateProfile: (state, action) => {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };
    },
  },
});

export const {setUser, updateProfile, setIsAuthenticate} = userSlice.actions;
export default userSlice.reducer;
