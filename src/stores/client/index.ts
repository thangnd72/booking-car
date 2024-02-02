import { EClientActions } from './client.constants';
import * as asyncActions from './client.actions';
import slice from './client.slice';

export { EClientActions };
export const {
  reducer: clientReducer,
  actions: { setAccessToken, setShowDialog, setProfile, setGlobalLoading },
} = slice;
export const { getProfileAction } = asyncActions;
