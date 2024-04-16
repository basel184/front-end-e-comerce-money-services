/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useLayoutEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/src/utils/navigation";
import "@/src/Style/Posts.css";

export default function PostDetails({ id }) {
  const [blog, setBlog] = useState({});
  const lang = localStorage.getItem("lng");
  const t = useTranslations();
  const locale = useLocale();
  const language = locale === "ar" ? "arabic" : "english";
  useLayoutEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/blog-detail/${id}?locale=${language}`
    )
      .then((res) => {
        return res.json();
      })
      .then((post) => {
        setBlog(post);
      });
    let { post, recent_posts } = blog;
  }, [id, language]);
  return (
    <>
      <div className="post_detail">
        <div className="container">
          <div className="img text-center">
            <img src={`${blog?.post?.photo}`} alt="" />
          </div>
          <div className="post_info text-center">
            <h1 className="post_title">{blog?.post?.title}</h1>
            <h6 className="post_cate">{blog?.post?.tags}</h6>
            <p
              className="post_desc"
              dangerouslySetInnerHTML={{ __html: blog?.post?.description }}
            ></p>
          </div>
        </div>
      </div>
      <div className="post_slider text-center">
        <h4 className="post_head mb-5 mt-5"> {t("articles_similar")}</h4>
        <Swiper
          modules={[Pagination, Navigation]}
          loop={true}
          navigation={true}
          spaceBetween={10}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            639: {
              slidesPerView: 1,
            },
            865: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 3,
            },
          }}
        >
          {blog?.recent_posts?.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <Link href={`/blog/post/${el.slug}`}>
                  <div className="img">
                    <img
                      style={{ width: "200px", height: "250px" }}
                      src={el?.photo}
                      alt=""
                    />
                  </div>
                  <div className="info">
                    <h4 className="slider_title">
                      {localStorage.getItem("lng") === "ar"
                        ? el?.title_arabic.slice(0, 22)
                        : el?.title_english.slice(0, 22)}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
