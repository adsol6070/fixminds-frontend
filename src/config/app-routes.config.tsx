import { ROUTE_PATHS } from "@/config/route-paths.config";
import {
  Dashboard,
  Login,
  Profile,
  Register,
  Settings,
  UserDetails,
  UserEdit,
  UserList,
  ForgotPassword,
  ResetPassword,
  ResendVerification,
  VerifyEmail,
  LeadList,
  LeadPreview,
} from "@/pages";

export const AUTH_ROUTES = [
  { path: ROUTE_PATHS.LOGIN, element: <Login /> },
  { path: ROUTE_PATHS.REGISTER, element: <Register /> },
  { path: ROUTE_PATHS.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: ROUTE_PATHS.RESET_PASSWORD, element: <ResetPassword /> },
  { path: ROUTE_PATHS.RESEND_VERIFICATION, element: <ResendVerification /> },
  { path: ROUTE_PATHS.VERIFY_EMAIL, element: <VerifyEmail /> },
];

export const PRIVATE_ROUTES = [
  { path: ROUTE_PATHS.DASHBOARD, element: <Dashboard /> },
  { path: ROUTE_PATHS.PROFILE, element: <Profile /> },
  { path: ROUTE_PATHS.SETTINGS, element: <Settings /> },

  { path: ROUTE_PATHS.USER_LIST, element: <UserList /> },
  { path: ROUTE_PATHS.USER_DETAILS(), element: <UserDetails /> },
  { path: ROUTE_PATHS.USER_EDIT(), element: <UserEdit /> },

  { path: ROUTE_PATHS.LEAD_LIST, element: <LeadList /> },
  { path: ROUTE_PATHS.LEAD_PREVIEW(), element: <LeadPreview /> },
  
];
