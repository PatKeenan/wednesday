import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const NotAuthenticated = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex w-full flex-col items-center">
        <Image
          src="/wed-gc.jpg"
          width={300}
          height={200}
          alt="mid-week"
          className="-mt-8 aspect-square"
        />
        <div className="w-80">
          <Button asChild className="w-full">
            <Link href="/api/auth/signin">Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
