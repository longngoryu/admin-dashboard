import React from "react";
import { Metadata } from "next";
import { DefaultLayout, FormElements } from "@/components";
import { PROJECT_NAME } from "@/constants/consts";

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
