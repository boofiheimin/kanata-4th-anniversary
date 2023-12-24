"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider className="w-full">{children}</NextUIProvider>;
}
