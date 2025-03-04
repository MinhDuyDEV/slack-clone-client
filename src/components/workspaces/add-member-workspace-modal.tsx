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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { addWorkspaceMember } from "@/services/workspaces";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";

export function AddMemberModal({ isOpen, onClose }: AddMemberModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WorkspaceRole>("MEMBER");
  const [isLoading, setIsLoading] = useState(false);
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setIsLoading(true);
      await addWorkspaceMember(workspaceId, {
        email: email.trim(),
        role,
      });

      // Invalidate workspace members query
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspaceId],
      });

      toast.success("Member added successfully");
    } catch (error) {
      toast.error("Failed to add member");
    } finally {
      setEmail("");
      setRole("MEMBER"); // Reset role to default
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add member to workspace</DialogTitle>
          <DialogDescription>
            Enter the email address of the user you want to add to this
            workspace.
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

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value: WorkspaceRole) => setRole(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SelectItem value="MEMBER">Member</SelectItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Can view and interact with channels</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Can manage channels and members</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SelectItem value="OWNER">Owner</SelectItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Full access to workspace settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SelectContent>
              </Select>
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
