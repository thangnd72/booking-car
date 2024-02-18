import { IClient } from '@/interfaces/auth.interfaces';
import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './client.actions';
import { DEFAULT_GET_LIST_RESPONSE } from '@/common/constants/common';
import { TCommonGetListResponse } from '@/interfaces/common.interface';

type TClientState = {
  profile?: IClient;
  accessToken?: string;
  showDialog: boolean;
  loading: boolean;
  // manage user
  listUser: TCommonGetListResponse<IClient[]>;
};

const initialState: TClientState = {
  profile: undefined,
  accessToken: '',
  showDialog: false,
  loading: false,
  listUser: DEFAULT_GET_LIST_RESPONSE,
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
    logout: (state) => initialState,
  },
  extraReducers(builder) {
    builder.addCase(asyncActions.getListUserAction.fulfilled, (state, { payload }) => {
      if (payload.page > 0) {
        state.listUser = {
          ...state.listUser,
          totalPages: payload.totalPages,
          page: payload.page,
          total: payload.total,
          data: [...state.listUser.data, ...payload.data],
        };
      } else {
        state.listUser = payload;
      }
    });
  },
});

export default clientSlice;
