"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "@/src/Style/wish_list.css";
import { getWishListData, setIsError } from "@/src/Redux/Reducers/wishList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import ProductCard from "../home/ProductsBuys/ProductCard";
import HomeSearch from "../home/HomeSearch";
import useIsAuthUser from "@/src/hooks/useIsAuth";

export default function WishList() {
  const isAuth = useIsAuthUser();

  const { wishlistData, isLoading, isError } = useSelector(
    (state) => state.wishList
  );
  console.log(isLoading, wishlistData, isError);

  const t = useTranslations();
  const locale = useLocale();
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

  const [list, setList] = useState();

  const language = locale === "ar" ? "arabic" : "english";

  const { mainData } = useSelector((state) => state.home);

  const [data, setData] = useState(mainData);

  const initialRender = useRef(true);

  useEffect(() => {
    fetch(`https://moneyservices.store/back/public/api/home?locale=${language}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [language]);

  useLayoutEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/wishlist?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data?.wishlist);
      });
  }, []);
  const removeItem = async (id) => {
    const res = await axios.get(
      `https://moneyservices.store/back/public/api/wishlist-delete?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }&product_id=${id}`
    );

    location.reload();
  };

  const [userWishList, setUserWishList] = useState([]);

  async function getUserWishList() {
    const currUser = JSON.parse(localStorage.getItem("user")) || "";
    console.log(currUser?.user?.id);
    if (currUser) {
      try {
        const res = await axios.get(
          `https://moneyservices.store/back/public/api/wishlist?user_id=${currUser.user.id}`,
          {}
        );
        console.log(res.data.wishlist);
        setUserWishList(res.data.wishlist);
        // handle with toast
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    // getUserWishList();
    dispatch(getWishListData());
  }, []);

  console.log(isError);

  useEffect(() => {
    console.log("*****************" + isError + "***********");

    // Skip the first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (isError === "FALSE") {
      toast.success(`Product Deleted Successfully! `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          backgroundColor: "#dc3545",
        },
      });
      dispatch(setIsError());
    }
  }, [isError]);

  return (
    isAuth && (
      <div className="wish_list pt-4">
        <div className="container wishList-container">
          <h4 className="list_title">{t("wish_list_title")}</h4>
          <div className="buy-products py-4">
            <div className="container">
              <div className="row mt-6">
                {wishlistData?.length < 1 ? (
                  <div className="row">
                    <div
                      className="container pt-5"
                      style={{ "text-align": "center" }}
                    >
                      <img
                        style={{ width: "20%" }}
                        src={"/assets/images/no_list.svg"}
                        alt=""
                      />
                      <h4 className="text-capitalize pt-5">
                        {t("wish_list_emty")}
                      </h4>
                    </div>
                  </div>
                ) : isError === "SERVER ERROR TRY AGAIN LATER..." ? (
                  <h4>خطأ من الخادم برجاء المحاولة مرة اخرى</h4>
                ) : (
                  wishlistData?.map((el) => {
                    return (
                      <ProductCard
                        el={el.product}
                        key={el.product.id}
                        copone={el.product.copone}
                        fav="Favorite"
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <HomeSearch />
        </div>
      </div>
    )
  );
}
