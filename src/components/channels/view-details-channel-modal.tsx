import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChannelId } from "@/hooks/channels/use-channel-id";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useGetChannel } from "@/hooks/channels/use-get-channel";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { ChannelType } from "@/lib/enum";

interface ViewChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ViewChannelModal({ isOpen, onClose }: ViewChannelModalProps) {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const { channel } = useGetChannel(workspaceId, channelId);

  if (!channel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>#{channel.name}</span>
            <Badge variant="secondary">
              {channel.type === ChannelType.PRIVATE ? "Private" : "Public"}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {channel.description || "No description"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Channel Details</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">ID</span>
                <span className="font-medium">{channel.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Created by</span>
                <span className="font-medium">
                  {channel?.createdBy || "Unknown"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Created on</span>
                <span className="font-medium">
                  {format(new Date(channel.createdAt), "PPP")}
                </span>
              </div>
            </div>
          </div>

          {channel.isPrivate && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Privacy Settings</h4>
              <p className="text-sm text-muted-foreground">
                This is a private channel. Only members can view and join.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
