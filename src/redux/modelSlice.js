// src/store/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenProfile: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openProfileModal: (state) => {
      state.isOpenProfile = true;
    },
    closeProfileModal: (state) => {
      state.isOpenProfile = false;
    },
    toggleProfileModal: (state) => {
      state.isOpenProfile = !state.isOpenProfile;
    },
  },
});

export const { openProfileModal, closeProfileModal, toggleProfileModal } =
  modalSlice.actions;
export default modalSlice.reducer;
