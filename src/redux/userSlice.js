import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: null,
  user_id: null,
  isCapitan: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.user_id = action.payload.data.user.id;
      state.token = action.payload.token;
    },
    updateUserInfo(state, action) {
      state.user.data.user = {
        ...state.user.data.user,
        ...action.payload,
      };
    }
    ,
    logout(state) {
      state.user = null;
      state.token = null;
      state.user_id = null;
    },
    isCapitan(state, action) {
      if (state.user.data.user.id === state.user.data.user.team.captain) {
        state.isCapitan = true;
      } else {
        state.isCapitan = false;
      }
    },
  },
});

export const { login, logout, isCapitan, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
