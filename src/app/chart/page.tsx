import React from "react";
import { Metadata } from "next";
import { Chart } from "@/components/Charts";
import { DefaultLayout } from "@/components";
import { PROJECT_NAME } from "@/constants/consts";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Chart`,
};

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;
