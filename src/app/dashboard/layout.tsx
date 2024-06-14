import { TabNavigation } from "@/components-feat/TabNavigation";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex h-full w-full max-w-xl flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-grow flex-col overflow-hidden px-5">
        {children}
      </div>
      <div className="h-20 flex-shrink-0 pt-3">
        <TabNavigation />
      </div>
    </main>
  );
}
