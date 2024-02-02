import { createSlice } from '@reduxjs/toolkit';

type TClientState = {
  profile?: any;
  accessToken?: string;
  showDialog: boolean;
  loading: boolean;
};

const initialState: TClientState = {
  profile: undefined,
  accessToken: '',
  showDialog: false,
  loading: false,
};

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setShowDialog: (state, { payload }) => {
      state.showDialog = payload;
    },
    setProfile: (state, { payload }) => {
      state.profile = payload;
    },
    setGlobalLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers(builder) {
    // builder.addCase(asyncActions.getProfileAction.fulfilled, (state, action) => {
    //   state.profile = action.payload as TClientProfile;
    // });
  },
});

export default clientSlice;
