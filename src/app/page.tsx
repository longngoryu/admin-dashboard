import { Metadata } from "next";
import { ECommerce, DefaultLayout } from "@/components";
import { PROJECT_NAME } from "@/constants/consts";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: PROJECT_NAME,
};

export default function Home() {
  // if (true) redirect("/signin");
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
