import Link from "next/link";
import { LucideIcon, StarIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#F9EDFFCC]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const SidebarItem = ({ icon: Icon, id, label, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          asChild
          variant="transparent"
          size="sm"
          className={cn(sidebarItemVariants({ variant }))}
        >
          <Link href={`/workspaces/${workspaceId}/channels/${id}`}>
            <Icon className="size-3.5 mr-1 shrink-0" />
            <span className="text-sm truncate">{label}</span>
          </Link>
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuCheckboxItem>View channel details</ContextMenuCheckboxItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Copy</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Copy name</ContextMenuItem>
            <ContextMenuItem>Copy link</ContextMenuItem>
            <ContextMenuItem>Copy huddle link</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem>Mute channel</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Change notifications</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Move channel</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-64">
            <ContextMenuCheckboxItem disabled>
              Move to ...
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={false}
              className="flex items-center"
            >
              <StarIcon className="size-4 mr-1" />
              Unstarrsdfsdf
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={false}
              className="flex items-center"
            >
              <StarIcon className="size-4 mr-1" />
              Unstarredsdf
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked
              className="flex items-center text-blue-500"
            >
              <StarIcon className="size-4 mr-1" />
              Starred
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem>
              Move to new section
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Remove from ...</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem>Edit all sections</ContextMenuCheckboxItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem className="text-red-500">
          Leave channel
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default SidebarItem;
