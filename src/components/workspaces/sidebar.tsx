import { usePathname } from "next/navigation";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import UserButton from "@/components/auth/user-button";
import SidebarButton from "./sidebar-button";
import WorkspaceSwitcher from "./workspace-switcher";

const sidebarButtons = [
  {
    icon: Home,
    label: "Home",
    path: "/workspaces",
  },
  {
    icon: MessagesSquare,
    label: "DMs",
    path: "/workspaces/dms",
  },
  {
    icon: Bell,
    label: "Activity",
    path: "/workspaces/activity",
  },
  {
    icon: MoreHorizontal,
    label: "More",
    path: "/workspaces/more",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      {sidebarButtons.map((button) => (
        <SidebarButton
          key={button.label}
          icon={button.icon}
          label={button.label}
          isActive={pathname.includes(button.path)}
        />
      ))}
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
