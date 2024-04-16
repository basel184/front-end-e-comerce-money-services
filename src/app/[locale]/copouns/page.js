import React from "react";
import { getTranslations } from "next-intl/server";
import Copouns from "@/src/components/Copouns";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("Cubans"),
  };
};
export default function CoponsPage() {
  return <Copouns />;
}
