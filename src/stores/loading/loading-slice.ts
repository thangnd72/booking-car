import { UnknownAction, createSlice } from '@reduxjs/toolkit';

const initialState: { [key: string]: boolean } = {};

export default createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action: UnknownAction) => action.type.includes('/pending'),
      (state, action: UnknownAction) => {
        state[action.type.split('/pending')[0]] = true;
      },
    );
    builder.addMatcher(
      (action: UnknownAction) => !action.type.includes('/pending'),
      (state, action: UnknownAction) => {
        state[action.type.split('/fulfilled')[0]] = false;
      },
    );
    builder.addMatcher(
      (action: UnknownAction) => action.type.includes('/rejected'),
      (state, action: UnknownAction) => {
        state[action.type.split('/rejected')[0]] = false;
      },
    );
  },
});
