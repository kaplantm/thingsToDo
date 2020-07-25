import {configureStore} from '@reduxjs/toolkit';
import ideasSlice from './slices/ideas';

const store = configureStore({
  reducer: {ideas: ideasSlice.reducer},
});

export default store;
