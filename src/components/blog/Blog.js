"use client";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import "@/src/Style/Posts.css";
import PostsSummry from "./PostsSummry";
import PostsCard from "./PostsCard";
import { useTranslations } from "next-intl";

export default function Blog() {
  const language =
    window.localStorage.getItem("lng") === "ar" ? "arabic" : "english";
  const [data, setBlog] = useState([]);
  const t = useTranslations();

  useLayoutEffect(() => {
    axios
      .get(
        `https://moneyservices.store/back/public/api/posts?locale=${language}`
      )
      .then((res) => {
        setBlog(res.data?.posts);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
      });
  }, [language]);

  return (
    <div className="posts">
      <div className="container">
        <div className="row">
          <h1 className="text-center post_head">{t("header_link_blog")}</h1>
          <div className="col-lg-4 col-md-12">
            <PostsSummry posts={data} />
          </div>
          <div
            className="col-lg-8 col-md-12 posts-read-x0"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {data?.map((el) => {
              return <PostsCard post={el} key={el.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
