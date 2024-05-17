import { LayoutDashboard, Shapes, Tag } from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/categories",
    icon: <Shapes />,
    label: "Categories",
  },
];
