"use client";

import type { ReactNode } from "react";
import { SerwistProvider } from "@serwist/next/react";

type SerwistRootProps = {
  children: ReactNode;
};

export function SerwistRoot({ children }: SerwistRootProps) {
  return (
    <SerwistProvider
      swUrl="/sw.js"
      register={false}
      reloadOnOnline={false}
      disable={process.env.NODE_ENV === "development"}
    >
      {children}
    </SerwistProvider>
  );
}
