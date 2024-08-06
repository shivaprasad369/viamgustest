import { createSlice } from '@reduxjs/toolkit';
const data=JSON.parse(localStorage.getItem('user'))
const initialState = {
  isAuthenticated:data?data.isAuthenticated:false ,
  user:data? data.user:[],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
        
      state.isAuthenticated = action.payload.varify;
      state.user = action.payload;
    //   console.log(state)
    
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = [];
      localStorage.removeItem('user');
      alert('logout successfully')
      console.log(state.user)
    },
    userLogin: (state, action) => {
        console.log(action.payload)
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state));
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;