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
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { createSection } from "@/services/sections";

interface CreateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateSectionModal({
  isOpen,
  onClose,
}: CreateSectionModalProps) {
  const [sectionName, setSectionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionName.trim()) return;

    try {
      setIsLoading(true);
      const response = await createSection(workspaceId, {
        name: sectionName,
      });

      console.log("response", response);

      if (response.success) {
        queryClient.invalidateQueries({
          queryKey: ["workspaceId", workspaceId],
        });

        toast.success("Section created successfully");
      }
    } catch (error) {
      toast.error("Failed to create section");
    } finally {
      setSectionName("");
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a new section</DialogTitle>
          <DialogDescription>
            Sections are where channels are stored. Use a name that is easy to
            find and understand.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Section name</Label>
              <div>
                <Input
                  id="name"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. Work, Personal, etc."
                  autoFocus
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading || !sectionName.trim()}>
              {isLoading ? "Creating..." : "Create Section"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
