"use client";

import {
  Card as NextUiCard,
  CardFooter,
  CardHeader,
} from "@heroui/card";
import { Skeleton } from "@heroui/react";

const CardLoading = () => {
  return (
    <NextUiCard isFooterBlurred className="h-[300px] w-full relative overflow-hidden">
      {/* Header */}
      <CardHeader className="absolute top-1 z-10 flex-col items-center w-full">
        <Skeleton className="absolute -top-0 right-1 h-6 w-16 rounded-full" />
        <Skeleton className="mt-2 absolute left-0 w-full h-8 rounded bg-black/60" />
      </CardHeader>

      {/* Image */}
      <Skeleton className="scale-120 z-0 h-full w-full -translate-y-6 object-cover" />

      {/* Footer */}
      <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-400 w-full px-2 py-1 flex items-center">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </CardFooter>
    </NextUiCard>
  );
};

export default CardLoading;
