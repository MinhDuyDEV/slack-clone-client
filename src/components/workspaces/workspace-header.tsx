import { useState } from "react";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import InviteModal from "@/components/workspaces/invite-modal";
import PreferencesModal from "@/components/workspaces/preferences-modal";
import { Workspace } from "@/interfaces/workspace.interface";
import { AddMemberModal } from "./add-member-workspace-modal";

interface WorkspaceHeaderProps {
  workspace: Workspace;
}

const WorkspaceHeader = ({ workspace }: WorkspaceHeaderProps) => {
  const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false);
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);
  return (
    <>
      <AddMemberModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValues={workspace.name}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
              size="sm"
            >
              <span className="truncate">{workspace.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => setInviteModalOpen(true)}
            >
              <p className="truncate">
                Invite people to{" "}
                <span className="text-[#5E2C5F]">{workspace.name}</span>
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer py-2"
              onClick={() => setPreferencesOpen(true)}
            >
              Preferences
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Hint label="New message" side="bottom">
          <Button variant="transparent" size="iconSm">
            <SquarePen className="size-4" />
          </Button>
        </Hint>
      </div>
    </>
  );
};

export default WorkspaceHeader;
