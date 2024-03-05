import ArrowDownIcon from './arrow-down.svg';
import ArrowLeftIcon from './arrow-left.svg';
import ArrowRightIcon from './arrow-right.svg';
import BackIcon from './back-icon.svg';
import CheckedAroundIcon from './checked-around.svg';
import CheckedIcon from './checked.svg';
import CloseIcon from './close.svg';
import EmptySearchIcon from './empty-search.svg';
import ErrorAroundIcon from './error-around.svg';
import EyeOffIcon from './eye-off.svg';
import EyeIcon from './eye.svg';
import ForgotPasswordIcon from './forgot-password.svg';
import LoginIcon from './login.svg';
import NewPasswordIcon from './new-password.svg';
import PasswordSuccessIcon from './password-success.svg';
import ProfileActive from './profile-active.svg';
import ProfileInactive from './profile-inactive.svg';
import ReportActiveIcon from './report-active.svg';
import ReportInactiveIcon from './report-inactive.svg';
import RouteActiveIcon from './route-active.svg';
import RouteInactiveIcon from './route-inactive.svg';
import TimeActiveIcon from './time-active.svg';
import TimeInactiveIcon from './time-inactive.svg';
import TruckActiveIcon from './truck-active.svg';
import TruckInactiveIcon from './truck-inactive.svg';
import UncheckIcon from './uncheck.svg';

const ShowHidePasswordIcon = ({ show = false }: { show: boolean }) =>
  show ? <EyeIcon /> : <EyeOffIcon />;

export {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BackIcon,
  CheckedAroundIcon,
  CheckedIcon,
  CloseIcon,
  EmptySearchIcon,
  ErrorAroundIcon,
  ForgotPasswordIcon,
  LoginIcon,
  NewPasswordIcon,
  PasswordSuccessIcon,
  ProfileActive,
  ProfileInactive,
  ReportActiveIcon,
  ReportInactiveIcon,
  RouteActiveIcon,
  RouteInactiveIcon,
  ShowHidePasswordIcon,
  TimeActiveIcon,
  TimeInactiveIcon,
  TruckActiveIcon,
  TruckInactiveIcon,
  UncheckIcon,
};
