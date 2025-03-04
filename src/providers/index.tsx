import { SocketProvider } from "./socket-provider";
import TanStackQueryProvider from "./tanstack-query-provider";
import ToastProvider from "./toast-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanStackQueryProvider>
      <ToastProvider />
      <SocketProvider>{children}</SocketProvider>
    </TanStackQueryProvider>
  );
}
