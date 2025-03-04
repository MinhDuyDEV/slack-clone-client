import { useState } from "react";
import { useToggle } from "react-use";
import { FaCaretDown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CreateChannelModal } from "@/components/channels/create-channel-modal";
import { CreateSectionModal } from "@/components/sections/create-section-modal";

interface WorkspaceSectionProps {
  children: React.ReactNode;
  label: string;
  sectionId: string;
}

const WorkspaceSection = ({
  label,
  children,
  sectionId,
}: WorkspaceSectionProps) => {
  const [on, toggle] = useToggle(true);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] =
    useState(false);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        <Button
          variant="transparent"
          className="p-0.5 text-sm text-[#F9EDFFCC] shrink-0 size-6"
          onClick={toggle}
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", on && "-rotate-90")}
          />
        </Button>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Button
              className="group px-1.5 text-sm text-[#F9EDFFCC] h-[28px] justify-start overflow-hidden items-center flex"
              size="sm"
              variant="transparent"
            >
              <span className="truncate">{label}</span>
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>Create</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-64">
                <ContextMenuItem
                  onClick={() => {
                    setIsCreateChannelModalOpen(true);
                  }}
                >
                  Create channel
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    setIsCreateSectionModalOpen(true);
                  }}
                >
                  Create section
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />

            <ContextMenuSub>
              <ContextMenuSubTrigger inset>Manage</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-64">
                <ContextMenuItem>Rename ...</ContextMenuItem>
                <ContextMenuItem className="text-red-500 focus:text-white focus:bg-red-500">
                  Delete ...
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Edit all section</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />

            <ContextMenuSub>
              <ContextMenuSubTrigger inset>Show and sort</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-64">
                <ContextMenuItem disabled>Show in this section</ContextMenuItem>
                <ContextMenuCheckboxItem checked className="text-blue-500">
                  All
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={false}>
                  Unreads only
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={false}>
                  Mentions only
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuItem disabled>Sort this section</ContextMenuItem>
                <ContextMenuCheckboxItem checked className="text-blue-500">
                  Alphabetically
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={false}>
                  By most recent
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={false}>
                  Priority
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuItem className="text-blue-500 focus:text-white focus:bg-blue-500 text-xs">
                  Change these settings for all sections in Preferences
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      {on && children}

      <CreateChannelModal
        isOpen={isCreateChannelModalOpen}
        onClose={() => setIsCreateChannelModalOpen(false)}
        sectionId={sectionId}
      />
      <CreateSectionModal
        isOpen={isCreateSectionModalOpen}
        onClose={() => setIsCreateSectionModalOpen(false)}
      />
    </div>
  );
};

export default WorkspaceSection;
