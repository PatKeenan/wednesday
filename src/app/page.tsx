import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { NotAuthenticated } from "@/components-feat/NotAuthenticated";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  if (!session) {
    return <NotAuthenticated />;
  }

  return <main></main>;
}
