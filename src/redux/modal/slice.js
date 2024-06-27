import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    isModalDelete: "",
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.isModalDelete = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.isModalDelete = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;