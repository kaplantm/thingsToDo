import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      displayName: null,
      email: null,
      emailVerified: false,
      isAnonymous: true,
      metadata: null,
      phoneNumber: null,
      photoURL: null,
      providerData: null,
      providerId: 'firebase',
      refreshToken: null,
      uid: null,
    },
  },
  reducers: {
    setUser(state, action) {
      const { user } = action.payload;

      console.log({ user });
      return { user };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
