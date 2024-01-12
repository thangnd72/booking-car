import AsyncStorage from '@react-native-async-storage/async-storage';
import { UnknownAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import allReducer from './all-reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [''],
};

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type TRootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<TRootState, any, UnknownAction>;
export const useAppDispatch: () => AppThunkDispatch = useDispatch;

export default store;
