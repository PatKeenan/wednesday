import * as React from "react";
import Image from "next/image";

export default function SmallImageHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <Image
        priority
        src="/wed-gc-no-bg.png"
        alt="wed-gc"
        height={100}
        width={200}
        className="mx-auto h-[150px] w-auto flex-shrink-0"
      />
      {children}
    </div>
  );
}
