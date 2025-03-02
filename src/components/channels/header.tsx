import { toast } from "sonner";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/common/use-confirm";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { members } from "@/lib/seed-data";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const [value, setValue] = useState(title);
  const [editOpen, setEditOpen] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this channel?",
    "you are about to delete this channel. This action is irreversible"
  );

  const member = members.find((m) => m.workspaceId === workspaceId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
    setValue(value);
  };

  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "ADMIN") return;

    setEditOpen(value);
  };

  // const handleDelete = async () => {
  //   const ok = await confirm();
  //   if (!ok) return;

  //   removeChannel(
  //     { channelId },
  //     {
  //       onSuccess: () => {
  //         toast.success("Channel deleted");
  //         router.push(`/workspaces/${workspaceId}`);
  //       },
  //       onError: () => {
  //         toast.error("Failed to delete channel");
  //       },
  //     }
  //   );
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   updateChannel(
  //     { name: value, channelId },
  //     {
  //       onSuccess: () => {
  //         toast.success("Channel updated");
  //         setEditOpen(false);
  //       },
  //       onError: () => {
  //         toast.error("Failed to update channel");
  //       },
  //     }
  //   );
  // };

  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <ConfirmDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
            size="sm"
          >
            <span className="truncate"># {title}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel name</p>
                    {member?.role === "ADMIN" && (
                      <p className="text-sm text-[#1264A3] hover:underline font-semibold">
                        Edit
                      </p>
                    )}
                  </div>
                  <p className="test-sm"># {title}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this channel</DialogTitle>
                </DialogHeader>
                <form
                  // onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <Input
                    value={value}
                    // disabled={isUpdatingChannel}
                    onChange={handleChange}
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="e.g. plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cannel</Button>
                    </DialogClose>
                    <Button>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {member?.role === "ADMIN" && (
              <button
                // onClick={handleDelete}
                // disabled={isRemovingChannel}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
