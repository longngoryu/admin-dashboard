"use client";
import { Dashboard, DefaultLayout } from "@/components";
import { useRouter } from "next/navigation";
import { useAuth, usePage } from "@/stores";
import { useEffect } from "react";

export default function Home() {
  const { setTitle } = usePage();
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTitle("");
    if (!userInfo) router.push("/signin");
  }, [setTitle, userInfo, router]);

  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
}
