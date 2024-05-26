import { Metadata } from "next";
import { DefaultLayout } from "@/components";
import { Calendar } from "@/components";
import { PROJECT_NAME } from "@/constants/consts";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Calender`,
};

export default function CalendarPage() {
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
}
