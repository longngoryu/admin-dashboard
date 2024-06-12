"use client";
import { Dashboard, DefaultLayout } from "@/components";

import { usePage } from "@/stores";
import { useEffect } from "react";

export default function Home() {
  const { setTitle } = usePage();

  useEffect(() => {
    setTitle("");
  }, [setTitle]);

  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
}
