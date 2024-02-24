import { IUser, IUserRole } from '@/interfaces/auth.interfaces';
import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './client.actions';
import { DEFAULT_GET_LIST_RESPONSE } from '@/common/constants/common';
import { TCommonGetDataResponse, TCommonGetListResponse } from '@/interfaces/common.interface';

type TClientState = {
  profile?: IUser;
  accessToken?: string;
  showDialog: boolean;
  loading: boolean;
  // manage user
  listUser: TCommonGetListResponse<IUser[]>;
  listRole: IUserRole[];
};

const initialState: TClientState = {
  profile: undefined,
  accessToken: '',
  showDialog: false,
  loading: false,
  listUser: DEFAULT_GET_LIST_RESPONSE,
  listRole: [],
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
    logout: (state) => {
      (state.profile = undefined),
        (state.accessToken = undefined),
        (state.listUser = DEFAULT_GET_LIST_RESPONSE),
        (state.showDialog = false),
        (state.loading = false);
    },
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

    builder.addCase(asyncActions.updateProfileUserAction.fulfilled, (state, { payload }) => {
      state.profile = payload;
    });

    builder.addCase(asyncActions.getListRoleAction.fulfilled, (state, { payload }) => {
      state.listRole = payload;
    });

    builder.addCase(asyncActions.updateCustomerProfileAction.fulfilled, (state, { payload }) => {
      const currentIndexUser = state.listUser.data.findIndex((e) => e.id === payload.id);
      if (currentIndexUser !== -1) {
        state.listUser.data[currentIndexUser] = payload;
      }
    });
  },
});

export default clientSlice;
