import { Metadata } from "next";
import { DefaultLayout, Breadcrumb } from "@/components";
import { TableOne, TableTwo, TableThree } from "@/components/Tables";
import { PROJECT_NAME } from "@/constants/consts";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Tables`,
};

export default function TablesPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
}
