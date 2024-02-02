/* eslint-disable react/react-in-jsx-scope */
import ArrowDownIcon from './arrow-down.svg';
import ArrowLeftIcon from './arrow-left.svg';
import BackIcon from './back-icon.svg';
import CalendarIcon from './calendar.svg';
import CartIcon from './cart.svg';
import CheckedAroundIcon from './checked-around.svg';
import CheckedIcon from './checked.svg';
import ErrorAroundIcon from './error-around.svg';
import EyeOffIcon from './eye-off.svg';
import EyeIcon from './eye.svg';
import HomeActiveIcon from './home-active.svg';
import HomeInactiveIcon from './home-inactive.svg';
import LockIcon from './lock.svg';
import LogoApp from './logo.svg';
import MessageIcon from './message.svg';
import NotificationIcon from './notification.svg';
import OrderActive from './order-active.svg';
import OrderInactive from './order-inactive.svg';
import PhoneIcon from './phone.svg';
import ProfileActive from './profile-active.svg';
import ProfileInactive from './profile-inactive.svg';
import UncheckIcon from './uncheck.svg';
import UserIcon from './user.svg';

const ShowHidePasswordIcon = ({ show = false }: { show: boolean }) =>
  show ? <EyeIcon /> : <EyeOffIcon />;

export {
  ArrowDownIcon,
  ArrowLeftIcon,
  BackIcon,
  CalendarIcon,
  CartIcon,
  CheckedAroundIcon,
  CheckedIcon,
  ErrorAroundIcon,
  HomeActiveIcon,
  HomeInactiveIcon,
  LockIcon,
  LogoApp,
  MessageIcon,
  NotificationIcon,
  OrderActive,
  OrderInactive,
  PhoneIcon,
  ProfileActive,
  ProfileInactive,
  ShowHidePasswordIcon,
  UncheckIcon,
  UserIcon,
};
