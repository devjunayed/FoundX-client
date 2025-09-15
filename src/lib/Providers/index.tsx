"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
