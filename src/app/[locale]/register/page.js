import Register from "@/src/components/auth/register";
import React from "react";
import { getTranslations } from "next-intl/server";

export const metadata = async () => {
  const t = await getTranslations();

  return {
    title: t("register_title"),
  };
};

export default function RegisterPage() {
  return <Register />;
}
