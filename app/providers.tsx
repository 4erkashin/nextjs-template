"use client";

import type { ReactNode } from "react";

import { QueryProvider } from "@/lib/query/query-provider";
import { MswGate } from "@/mocks/msw-gate";

export function Providers({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MswGate>
      <QueryProvider>{children}</QueryProvider>
    </MswGate>
  );
}
