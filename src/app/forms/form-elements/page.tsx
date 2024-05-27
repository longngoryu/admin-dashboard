import React from "react";
import { Metadata } from "next";
import { PROJECT_NAME } from "@/constants/consts";
import { DefaultLayout } from "@/components";
import { FormElements } from "@/components/FormElements";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Form Elements`,
};

export default function FormElementsPage() {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
}
