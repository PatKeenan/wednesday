"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronLeftIcon,
  DotsHorizontalIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type DetailScreenLayoutProps = {
  children: React.ReactNode;
  headerTitle: string;
  onDeleteClick?: () => void;
};

export const DetailScreenLayout: React.FC<DetailScreenLayoutProps> = ({
  children,
  headerTitle,
  onDeleteClick,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col pb-section">
      <div className="absolute left-0 right-0 flex h-12 items-center justify-center border-b border-foreground/10">
        <div className="flex w-1/5 flex-shrink-0 justify-start">
          <Button variant="ghost" onClick={handleBack}>
            <ChevronLeftIcon className="-ml-1.5 h-5 w-5" />
            Back
          </Button>
        </div>
        <div className="flex flex-grow justify-center text-center">
          <p className="text-lg font-semibold">{headerTitle}</p>
        </div>
        <div className="flex w-1/5 flex-shrink-0 flex-grow-0 overflow-hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="focus-visible:ring-transparent"
              >
                <DotsHorizontalIcon className="w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={0} align="start" alignOffset={-60}>
              <DropdownMenuItem>
                <button
                  className="flex w-full items-center space-x-4 text-foreground"
                  onClick={onDeleteClick}
                >
                  <TrashIcon className="w-5" />
                  <span className="text-sm text-foreground">Delete</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-12 flex h-full w-full flex-1 flex-grow flex-col pt-4">
        {children}
      </div>
    </div>
  );
};
