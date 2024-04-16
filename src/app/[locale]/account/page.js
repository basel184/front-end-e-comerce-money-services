import Account from "@/src/components/user/account";
import { getTranslations } from "next-intl/server";
import React from "react";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("Account"),
  };
};

export default function page() {
  return <Account />;
}
