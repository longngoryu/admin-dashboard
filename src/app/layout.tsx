"use client";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components";
import { useColorMode } from "@/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth, usePage } from "@/stores";
import { API_ME, PAGE_TITLE } from "@/constants";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ResponseDataMe } from "@/types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useColorMode();
  const { title } = usePage();
  const [loading, setLoading] = useState<boolean>(true);
  const [queryClient] = useState(() => new QueryClient());
  const { userInfo, signin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    if (!userInfo) {
      (async () => {
        try {
          const { data } = await axios({
            method: "get",
            url: API_ME,
          });
          const dataMe: ResponseDataMe = {
            userId: data.data.firebaseData.user_id,
            email: data.data.firebaseData.email,
            name: data.data.firebaseData.name,
            authTime: data.data.firebaseData.auth_time,
            emailVerified: data.data.firebaseData.email_verified,
          };
          signin(dataMe);
        } catch (error) {
          router.push("/auth/signin");
        }
      })();
    }
  }, [userInfo, signin, router]);

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
