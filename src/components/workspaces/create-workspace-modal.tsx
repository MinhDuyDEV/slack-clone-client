"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { createWorkspace } from "@/services/workspaces";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWorkspaceModal({
  isOpen,
  onClose,
}: CreateWorkspaceModalProps) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    try {
      setIsLoading(true);
      const response = await createWorkspace({ name: workspaceName });
      console.log("response:", response);

      if (response.status === 201) {
        setWorkspaceName("");

        toast.success("Workspace created successfully");
        router.push(`/workspaces/${response.data.data.id}`);
      }
    } catch (error) {
      console.log("Error creating workspace:", error);
      toast.error("Error creating workspace");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add a new workspace</DialogTitle>
          <DialogDescription>
            A workspace is where you and your teammates communicate. Make it
            short and memorable.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-5">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="col-span-3"
              placeholder="Acme Inc"
              autoFocus
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || !workspaceName.trim()}>
              {isLoading ? "Creating..." : "Create Workspace"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
