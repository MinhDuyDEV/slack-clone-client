"use client";

import MessageThread from "@/components/messages/thread";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/workspaces/sidebar";
import HeaderBar from "@/components/workspaces/header-bar";
import { useThreadPanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { threadMessageId, hideThreadPanel } = useThreadPanel();
  const isThreadVisible = !!threadMessageId;

  return (
    <div className="h-full">
      <HeaderBar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="md-workspace-layout"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            {/* <WorkspaceSidebar /> */}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
          {isThreadVisible && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {threadMessageId ? (
                  <MessageThread
                    messageId={threadMessageId}
                    onClose={hideThreadPanel}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
