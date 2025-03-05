import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/providers/socket-provider";
import { Message } from "@/interfaces/message.interface";

export const useChannelSocket = (channelId: string) => {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.on(
      "onMessage",
      (data: {
        type: "MESSAGE_CREATE" | "MESSAGE_UPDATE" | "MESSAGE_DELETE";
        data: any;
        channelId: string;
      }) => {
        if (data.channelId !== channelId) return;
        console.log("channelId", channelId);
        switch (data.type) {
          case "MESSAGE_CREATE":
            queryClient.setQueryData(
              ["messages", channelId],
              (oldData: any) => {
                console.log("oldData", oldData);
                const result = {
                  ...oldData,
                  data: [...(oldData?.data || []), data.data],
                };
                console.log("result", result);
                return result;
              }
            );
            break;

          case "MESSAGE_UPDATE":
            queryClient.setQueryData(
              ["messages", channelId],
              (oldData: any) => ({
                ...oldData,
                data:
                  oldData?.data.map((message: Message) =>
                    message.id === data.data.id ? data.data : message
                  ) || [],
              })
            );
            break;

          case "MESSAGE_DELETE":
            queryClient.setQueryData(
              ["messages", channelId],
              (oldData: any) => ({
                ...oldData,
                data:
                  oldData?.data.filter(
                    (message: Message) => message.id !== data.data.id
                  ) || [],
              })
            );
            break;
        }
      }
    );

    socket.on(
      "onThreadMessage",
      (data: {
        type:
          | "THREAD_MESSAGE_CREATE"
          | "THREAD_MESSAGE_UPDATE"
          | "THREAD_MESSAGE_DELETE";
        data: any;
        channelId: string;
        parentId: string;
      }) => {
        if (data.channelId !== channelId) return;
        console.log("thread message data", data);

        switch (data.type) {
          case "THREAD_MESSAGE_CREATE":
            queryClient.setQueryData(
              ["thread-replies", channelId, data.parentId],
              (oldData: any) => {
                console.log("oldData thread", oldData);
                const result = {
                  ...oldData,
                  data: [...(oldData?.data || []), data.data],
                };
                console.log("result thread", result);
                return result;
              }
            );
            break;

          case "THREAD_MESSAGE_UPDATE":
            queryClient.setQueryData(
              ["thread-replies", channelId, data.parentId],
              (oldData: any) => {
                console.log("oldData thread update", oldData);
                return {
                  ...oldData,
                  data:
                    oldData?.data.map((message: Message) =>
                      message.id === data.data.id ? data.data : message
                    ) || [],
                };
              }
            );
            break;

          case "THREAD_MESSAGE_DELETE":
            queryClient.setQueryData(
              ["thread-replies", channelId, data.parentId],
              (oldData: any) => {
                console.log("oldData thread delete", oldData);
                return {
                  ...oldData,
                  data:
                    oldData?.data.filter(
                      (message: Message) => message.id !== data.data.id
                    ) || [],
                };
              }
            );
            break;
        }
      }
    );

    return () => {
      socket.off("onMessage");
      socket.off("onThreadMessage");
    };
  }, [socket, channelId, queryClient]);
};
