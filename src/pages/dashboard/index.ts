import { lazy } from "react";

export const Dashboard = lazy(() => import("./Dashboard"));

// User Management Pages
export const UserList = lazy(() => import("./users/UserList"));
export const UserDetails = lazy(() => import("./users/UserDetails"));
export const UserEdit = lazy(() => import("./users/UserEdit"));

// Lead Management Pages
export const LeadList = lazy(() => import("./leads/leadList"));
export const LeadPreview = lazy(() => import("./leads/leadPreview"));
