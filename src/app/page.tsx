"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetWorkspaces } from "@/hooks/workspaces/use-get-workspaces";
import { handleLogout } from "@/services/auth";
import { CreateWorkspaceModal } from "@/components/workspaces/create-workspace-modal";
import Image from "next/image";
import Link from "next/link";
import { useGetMe } from "@/hooks/auth/use-get-me";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Workspace } from "@/interfaces/workspace.interface";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { me } = useGetMe();
  const { workspaces, isLoading } = useGetWorkspaces();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  if (!me) return null;
  if (!workspaces) return null;

  return (
    <div className="min-h-screen bg-[#5E2C5F] flex flex-col items-center justify-center px-4 py-40">
      {/* Welcome back header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-5xl">👋</span>
        <h2 className="text-white text-5xl font-bold">
          Welcome back, {me?.displayName}
        </h2>
      </div>

      <div className="w-full max-w-3xl flex flex-col">
        {/* Workspaces section */}
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col shadow-sm rounded-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-rose-50">
              <h2 className="text-xl font-medium">
                Workspaces for {me?.email}
              </h2>
            </div>
            {workspaces?.map((workspace: Workspace) => (
              <div
                key={workspace.id}
                className="bg-purple-50 overflow-hidden border-t"
              >
                <div className="flex justify-between items-center p-4 gap-3">
                  <Image
                    className="rounded-lg"
                    src={
                      workspace.logo ??
                      "https://a.slack-edge.com/80588/img/avatars-teams/ava_0005-88.png"
                    }
                    alt="Workspace logo"
                    width={75}
                    height={75}
                  />
                  <div className="flex flex-col">{workspace.name}</div>
                  <Button
                    className="ml-auto p-4 h-fit bg-primary1 hover:bg-primary1/90"
                    onClick={() => {
                      router.push(`/workspaces/${workspace.id}`);
                    }}
                  >
                    LAUNCH SLACK
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create new workspace section */}
        <div className="bg-orange-50 rounded-lg overflow-hidden mt-5">
          <div className="flex items-center px-2 ">
            <div className="w-1/4">
              <Image
                src="https://a.slack-edge.com/613463e/marketing/img/homepage/bold-existing-users/create-new-workspace-module/woman-with-laptop-color-background@2x.png"
                alt="Person using laptop"
                width={200}
                height={120.5}
                className="object-contain"
              />
            </div>
            <div className="w-3/4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Want to use Slack with a different team?
              </h2>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                variant="outline"
                className="border-purple-800 text-purple-800 hover:bg-purple-50"
              >
                CREATE A NEW WORKSPACE
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white pt-8">
          <p>
            Not seeing your workspace?{" "}
            <Link
              href="/login"
              onClick={() => {
                handleLogout();
                queryClient.clear();
              }}
              className="text-cyan-400 hover:underline inline-flex items-center"
            >
              Try using a different email
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </p>
        </div>
      </div>

      {/* Create Workspace Modal */}
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
