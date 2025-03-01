import { usePathname } from "next/navigation";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import UserButton from "@/components/auth/user-button";
import SidebarButton from "./sidebar-button";
// import WorkspaceSwitcher from "./workspace-switcher";

const sidebarButtons = [
  {
    icon: Home,
    label: "Home",
  },
  {
    icon: MessagesSquare,
    label: "DMs",
  },
  {
    icon: Bell,
    label: "Activity",
  },
  {
    icon: MoreHorizontal,
    label: "More",
  },
];

const Sidebar = () => {
  const currentPath = usePathname();

  // Check if current path is in workspace section
  const isWorkspaceActive = (path: string) => currentPath.includes(path);

  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-4 items-center pt-[9px] pb-4">
      {/* <WorkspaceSwitcher /> */}
      {sidebarButtons.map((button) => (
        <SidebarButton
          key={button.label}
          icon={button.icon}
          label={button.label}
          isActive={isWorkspaceActive(`/workspaces`)}
        />
      ))}
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
