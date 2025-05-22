import { BiUserPlus } from "react-icons/bi";
import { ROUTES } from "@/config/route-paths.config";

export const sidebarMenuItems = [
  // {
  //   label: "Dashboard",
  //   icon: <FiHome size="22" />,
  //   path: ROUTES.PRIVATE.DASHBOARD,
  // },
   {
    label: "Leads",
    icon: <BiUserPlus size="22" />,
    path: ROUTES.PRIVATE.LEAD_LIST,
  },
  // {
  //   label: "Leads",
  //   icon: <BiUserPlus size="22" />,
  //   subMenu: [
  //     {
  //       label: "All Leads",
  //       icon: <span>-</span>,
  //       path: ROUTES.PRIVATE.LEAD_LIST,
  //     },
  //     {
  //       label: "Create Blog",
  //       icon: <span>-</span>,
  //       path: ROUTES.PRIVATE.CREATE_BLOG,
  //     },
  //     {
  //       label: "Blog Categories",
  //       icon: <span>-</span>,
  //       path: ROUTES.PRIVATE.BLOG_CATEGORIES,
  //     },
  //   ],
  // },
];
