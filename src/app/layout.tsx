"use client";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components";
import { useColorMode } from "@/hooks";
import useAuth from "@/stores/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);
  useColorMode();
  const { user } = useAuth();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
