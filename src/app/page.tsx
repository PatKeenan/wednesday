import { getServerAuthSession } from "@/server/auth";
import { NotAuthenticated } from "@/components-feat/NotAuthenticated";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return <NotAuthenticated />;
  }

  if (session) {
    redirect("/dashboard");
  }
}
