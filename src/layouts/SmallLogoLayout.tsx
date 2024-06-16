import * as React from "react";
import Image from "next/image";

export const SmallILogoLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-full flex-1 flex-col overflow-auto">
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
};
