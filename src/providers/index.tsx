import TanStackQueryProvider from "./tanstack-query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TanStackQueryProvider>{children}</TanStackQueryProvider>;
}
