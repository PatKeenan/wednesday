import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const NotAuthenticated = () => {
  return (
    <div className="grid h-screen place-items-center overflow-hidden">
      <div className="">
        <Image
          src="/wed-gc.jpg"
          width={300}
          height={300}
          alt="mid-week"
          className=""
        />
        <div className="space-y-8">
          <h1>Not authenticated</h1>
          <Button asChild className="w-full">
            <Link href="/api/auth/signin">Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
