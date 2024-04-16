/* eslint-disable @next/next/no-img-element */

import { Link } from "@/src/utils/navigation";
import { useTranslations } from "next-intl";

/* eslint-disable react/prop-types */
export default function PostsCard({ post }) {
  const t = useTranslations();
  return (
    <div
      className="box mt-4 text-center"
      style={{
        "box-shadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        padding: "10px",
        width: "560px",
      }}
    >
      <Link href={`/blog/post/${post?.slug}`}>
        <img
          style={{ width: "300px", height: "300px" }}
          src={post?.photo}
          alt={post?.title}
        />
      </Link>
      <h4 className="post_title">{post?.title}</h4>
      <p className="post_tage" style={{ color: "#ddd" }}>
        {post?.tags}
      </p>
      <p
        className="post_content"
        dangerouslySetInnerHTML={{
          __html: post?.summary?.slice(0, 100),
        }}
        style={{ color: "#979595" }}
      ></p>
      <Link className="btn btn-warning" href={`/blog/post/${post?.slug}`}>
        {t("blog_read_more")}
      </Link>
    </div>
  );
}
