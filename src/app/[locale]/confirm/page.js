import React from "react";
import { getTranslations } from "next-intl/server";
import ConfirmCode from "@/src/components/ConfirmCode";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("header_link_winners"),
    description: t("about_us4"),
  };
};

export default function ConfirmPage() {
  return <ConfirmCode />;
}
