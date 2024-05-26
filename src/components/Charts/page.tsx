"use client";
import { Breadcrumb } from "@/components";
import { ChartOne, ChartTwo, ChartThree } from "@/components/Charts";
import React from "react";

export const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};
