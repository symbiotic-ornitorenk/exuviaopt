import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('access'),
    user: localStorage.getItem('username'), // Sayfa yenilenince kaybolmaması için
    isAuthenticated: !!localStorage.getItem('access'),
  },
  reducers: {
    loginSuccess: (state, action) => {
      // action.payload artık sadece token değil, bir obje olacak
      state.token = action.payload.access;
      state.user = action.payload.username;
      state.isAuthenticated = true;

      localStorage.setItem('access', action.payload.access);
      localStorage.setItem('username', action.payload.username);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;