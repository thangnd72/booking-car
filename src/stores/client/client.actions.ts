import { createAsyncThunk } from '@reduxjs/toolkit';
import { EClientActions } from './client.constants';

export const getProfileAction = createAsyncThunk(EClientActions.GET_PROFILE, async () => {
  try {
    // const response = await getProfile();
    // return response;
  } catch (error) {
    return error;
  }
});
