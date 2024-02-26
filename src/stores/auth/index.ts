import { EAuthActions } from './auth.constants';
import * as asyncActions from './auth.actions';

export { EAuthActions };
export const { logInAction, signUpAction, changePasswordAction } = asyncActions;
