"use client";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components";
import { useColorMode } from "@/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePage } from "@/stores";
import { PAGE_TITLE } from "@/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useColorMode();
  const { title } = usePage();
  const [loading, setLoading] = useState<boolean>(true);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{`${PAGE_TITLE} ${title && `- ${title}`}`}</title>
      </head>
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          )}
        </div>
      </body>
    </html>
  );
}
