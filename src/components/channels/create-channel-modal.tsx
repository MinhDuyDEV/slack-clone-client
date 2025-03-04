import { useRouter } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createChannel } from "@/services/channels";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { ChannelType } from "@/lib/enum";

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
  const [visibility, setVisibility] = useState(ChannelType.PUBLIC);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    try {
      setIsLoading(true);
      const response = await createChannel(workspaceId, {
        name: channelName,
        sectionId: sectionId,
        type: visibility as ChannelType,
      });

      if (response.success === true) {
        queryClient.invalidateQueries({
          queryKey: ["workspaceId", workspaceId],
        });

        toast.success("Channel created successfully");
        router.push(`/workspaces/${workspaceId}/channels/${response.data.id}`);
      }
    } catch (error: any) {
      console.log("Error creating channel:", error);
      toast.error("Error creating channel");
    } finally {
      setChannelName("");
      setVisibility(ChannelType.PUBLIC);
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
            Channels are where conversations happen around a topic. Use a name
            that is easy to find and understand.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Channel name</Label>
              <div>
                <Input
                  id="name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="col-span-3"
                  placeholder="# e.g. plan-budget"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup
                value={visibility}
                onValueChange={(value) => setVisibility(value as ChannelType)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ChannelType.PUBLIC} id="public" />
                  <Label htmlFor="public" className="cursor-pointer">
                    Public — anyone
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={ChannelType.PRIVATE} id="private" />
                  <div className="flex flex-col">
                    <Label htmlFor="private" className="cursor-pointer">
                      Private — only specific people
                    </Label>
                  </div>
                </div>

                <span className="text-sm text-muted-foreground">
                  Can only be viewed or joined by invitation
                </span>
              </RadioGroup>
            </div>
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
