import { useState } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
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
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import { addChannelMember } from "@/services/channels";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setIsLoading(true);
      await addChannelMember(workspaceId, channelId, {
        email: email.trim(),
      });

      // Invalidate channel members query
      queryClient.invalidateQueries({
        queryKey: ["channel-members", channelId],
      });

      toast.success("Member added successfully");
    } catch (error) {
      toast.error("Failed to add member");
    } finally {
      setEmail("");
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add member to channel</DialogTitle>
          <DialogDescription>
            Enter the email address of the user you want to add to this channel.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter email address"
                  autoFocus
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading || !email.trim()}>
              {isLoading ? "Adding..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
