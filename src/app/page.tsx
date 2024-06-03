"use client";
import { Dashboard, DefaultLayout } from "@/components";
import { PAGE_TITLE } from "@/constants";
import { redirect } from "next/navigation";
import { usePage } from "@/stores";
import { useEffect } from "react";

export default function Home() {
  const { setTitle } = usePage();

  useEffect(() => {
    setTitle("");
  }, [setTitle]);
  // if (true) redirect("/signin");
  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
}
