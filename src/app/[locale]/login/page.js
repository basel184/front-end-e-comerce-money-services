import React from "react";
import { getTranslations } from "next-intl/server";
import Login from "@/src/components/auth/login";

export const metadata = async () => {
  const t = await getTranslations();

  return {
    title: t("register_title"),
  };
};
export default function LoginPage() {
  return <Login />;
}
