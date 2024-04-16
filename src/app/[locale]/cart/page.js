import NewCart from "@/src/components/cart/NewCart";
import { getTranslations } from "next-intl/server";
import React from "react";

export const metadata = async () => {
  const t = await getTranslations();
  return {
    title: t("cart"),
  };
};

export default function Cart() {
  return (
    <>
      <NewCart />
    </>
  );
}
