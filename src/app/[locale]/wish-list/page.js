import WishList from "@/src/components/wish-list/wishList";
import React from "react";
import { getTranslations } from "next-intl/server";

export const metadata = async () => {
  const t = await getTranslations();

  return {
    title: t("register_title"),
  };
};

export default function page() {
  return <WishList />;
}
