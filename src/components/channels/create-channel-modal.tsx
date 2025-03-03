import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createChannel } from "@/services/channels";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
}

export function CreateChannelModal({
  isOpen,
  onClose,
  sectionId,
}: CreateChannelModalProps) {
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    try {
      setIsLoading(true);
      const response = await createChannel(workspaceId, {
        name: channelName,
        sectionId: sectionId,
      });

      if (response.status === 201) {
        setChannelName("");

        toast.success("Channel created successfully");
        router.push(
          `/workspaces/${workspaceId}/channels/${response.data.data.id}`
        );
      }
    } catch (error: any) {
      console.log("Error creating channel:", error);
      toast.error("Error creating channel");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
          <DialogDescription>
            Channels are where your team communicates. They are best when
            organized around a topic.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-5">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="col-span-3"
              placeholder="example-channel"
              autoFocus
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || !channelName.trim()}>
              {isLoading ? "Creating..." : "Create Channel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
