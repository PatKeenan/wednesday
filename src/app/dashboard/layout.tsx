import { NotAuthenticated } from "@/components-feat/NotAuthenticated";
import { TabNavigation } from "@/components-feat/TabNavigation";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return <NotAuthenticated />;
  }

  return (
    <main className="mx-auto flex h-full w-full max-w-xl flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-grow flex-col overflow-hidden">
        {children}
      </div>
      <TabNavigation />
    </main>
  );
}
