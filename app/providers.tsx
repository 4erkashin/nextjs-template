"use client";

import type { ReactNode } from "react";

import { MotionProvider } from "@/lib/motion/provider";
import { QueryProvider } from "@/lib/query/query-provider";
import { MswGate } from "@/mocks/msw-gate";

export function Providers({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MswGate>
      <QueryProvider>
        <MotionProvider>{children}</MotionProvider>
      </QueryProvider>
    </MswGate>
  );
}
