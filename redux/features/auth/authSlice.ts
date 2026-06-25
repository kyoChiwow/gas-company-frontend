import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  verifyEmail: string | null;
}

const initialState: AuthState = {
  verifyEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setVerifyEmail: (state, action: PayloadAction<string>) => {
      state.verifyEmail = action.payload;
    },

    clearVerifyEmail: (state) => {
      state.verifyEmail = null;
    },
  },
});

export const { setVerifyEmail, clearVerifyEmail } = authSlice.actions;

export default authSlice.reducer;