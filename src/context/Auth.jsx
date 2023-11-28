import { createSlice } from "@reduxjs/toolkit";

const initialAuth = { idToken: "", displayName: "", photoUrl: "", emailVerified: false };

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
    updateDetails(state, action) {
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
      state.emailVerified = action.payload.emailVerified;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
