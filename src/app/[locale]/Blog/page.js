import Blog from "@/src/components/blog/Blog";
import { getTranslations } from "next-intl/server";
import React from "react";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("header_link_blog"),
    description: t("about_us4"),
  };
};

export default function blogPAge() {
  return <Blog />;
}
