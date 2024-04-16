"use client";
import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton } from "react-share";

function Shear({ data, tf, tt }) {
  const fullUrl = typeof window !== "undefined" && window.location.href;
  return (
    <>
      <FacebookShareButton
        url={`${fullUrl}`}
        quote={"hey let's go"}
        hashtag={data?.product_detail?.cat_info?.title}
        className="facebook_share-contest"
      >
        {tf}
        <FaFacebookF style={{ margin: "0px 8px" }} />
      </FacebookShareButton>

      <TwitterShareButton
        url={`${fullUrl}`}
        quote={"hey let's go"}
        hashtag={data?.product_detail?.cat_info?.title}
        className="twitter_share-contest"
      >
        {tt}
        <FaTwitter style={{ margin: "0px 8px" }} />
      </TwitterShareButton>
    </>
  );
}

export default Shear;
