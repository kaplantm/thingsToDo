import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import ideasReducer from './slices/ideas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({ ideas: ideasReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

// TODO: save and restore from local storage

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);

// export default () => {
//   const store = configureStore({
//     reducer: persistedReducer,
//   });
//   const persistor = persistStore(store);
//   return { store, persistor };
// };
