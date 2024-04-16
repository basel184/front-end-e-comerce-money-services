import PostDetails from "@/src/components/blog/PostDetails";
import React from "react";
import { getLocale } from "next-intl/server";

export async function generateMetadata({ params }, parent) {
  // read route params
  const id = params.id;
  const locale = await getLocale();
  const language = locale === "ar" ? "arabic" : "english";

  // fetch data
  const product = await fetch(
    `https://moneyservices.store/back/public/api/blog-detail/${id}?locale=${language}`
  );

  const data = await product.json();
  return {
    title: data?.post?.title,
  };
}

{
  /* <Helmet>
  <title>{blog?.post?.title}</title>
  <meta name="description" content={t("about_us4")} />
</Helmet>; */
}
export default function PostPAge({ params: { id } }) {
  return <PostDetails id={id} />;
}
