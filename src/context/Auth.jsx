import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { idToken: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    updateAuth(state, action) {
      state.idToken = action.payload;
    },
    remoteAuth(state) {
      state.idToken = "";
      localStorage.removeItem("idToken");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
