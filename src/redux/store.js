import {configureStore} from '@reduxjs/toolkit';
import ideasReducer from './slices/ideas';

// TODO: save and restore from local storage
const store = configureStore({
  reducer: {ideas: ideasReducer},
});

export default store;
