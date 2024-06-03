import { DefaultLayout, Breadcrumb } from "@/components";
import { TableOne, TableTwo, TableThree } from "@/components/Tables";

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
