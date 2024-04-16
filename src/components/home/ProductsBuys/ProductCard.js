/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Line } from "rc-progress";
import StarsRating from "react-star-rate";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  setIsError,
  setWishList,
} from "@/src/Redux/Reducers/wishList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/utils/navigation";

export default function ProductCard({ el, copone, fav }) {
  const [isFavorite, setIsFavorite] = useState(fav || "Not Set");
  const t = useTranslations();
  const [apiTrigger, setApiTrigger] = useState("Not SET");
  const cardIDRef = useRef(null);
  const locale = useLocale();

  const { isError } = useSelector((state) => state.wishList);
  console.log("ERROR ", isError);

  const dispatch = useDispatch();
  const rating = el?.get_review?.map((el) => {
    return el.rate;
  });

  function handleFavorite() {
    setIsFavorite((prev) => {
      if (prev === "Favorite") {
        setApiTrigger("DELETE");
        return "Not Favorite";
      } else {
        setApiTrigger("ADD");
        return "Favorite";
      }
    });
    console.log(el);
    cardIDRef.current = el.id;
  }

  async function addFavorite(id, slug) {
    try {
      const res = await axios.get(
        `https://moneyservices.store/back/public/api/wishlist/${slug}?user_id=${id}`,
        {}
      );
      console.log(res);
      // handle with toast
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteFromFavorite(uID, pID) {
    try {
      const res = await axios.get(
        `https://moneyservices.store/back/public/api/wishlist-delete?user_id=${uID}&product_id=${pID}`,
        {}
      );
      console.log(res);
      // handle with toast
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    console.log("IS ERROR ", isError);
    console.log("cardREFID ", cardIDRef.current);
    console.log("el", el.id);

    if (isError === "FALSE" && el.id === cardIDRef.current) {
      //  console.log("inside addOrdelte ", cardIDRef.current);
      if (apiTrigger === "ADD") {
        toast.success(`Product ${el.title} Added Successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            backgroundColor: "orange",
          },
        });
        cardIDRef.current = null;
        dispatch(setIsError());
      } else if (apiTrigger === "DELETE") {
        toast.success(`Product ${el.title} Deleted Successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            backgroundColor: "#dc3545",
          },
        });
        cardIDRef.current = null;
        dispatch(setIsError());
      }
    } else if (isError === "TRUE" && el.id === cardIDRef.current) {
      toast.error("Error!! Please Try Again Later..", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      cardIDRef.current = null;
      dispatch(setIsError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("user")) || "";
    console.log(currUser?.user?.id);
    console.log("TRIGGER ", apiTrigger);

    if (currUser) {
      if (isFavorite === "Favorite" && apiTrigger === "ADD") {
        // addFavorite(currUser.user.id, el.slug);
        dispatch(setWishList(el));

        //  addFavorite(currUser.id, el.slug);
      } else if (isFavorite === "Not Favorite" && apiTrigger === "DELETE") {
        console.log(currUser?.user?.id || currUser?.id, " ", el.id);
        //  deleteFromFavorite(currUser.user.id, el.id);
        dispatch(deleteItem(el.id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite]);

  console.log(isFavorite);
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="box card-box">
        <div className="img prod-img">
          <img
            src={`${el?.photo?.split(",")[0]}`}
            alt={el.title}
            loading="lazy"
          />

          {localStorage.getItem("token") ? (
            <div className="operation ">
              <button
                className="preview fav-btn"
                onClick={handleFavorite}
                style={{
                  color: isFavorite === "Favorite" ? "#ffb61e" : "#a0a0a0",
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="box-info">
          <Link className="product_title" href={`/store/product/${el?.slug}`}>
            {/*             {el.title}
             */}{" "}
            {/*           {i18n.language === "english"
              ? el?.title_english
              : i18n.language === "arabic"
              ? el?.title_arabic
              || el?.title} */}
            {el?.title ||
              (locale === "en" ? el?.title_english : el?.title_arabic)}
          </Link>
          {/* <StarsRating value={Math.round(el?.rating?.rate)} /> */}
          <div>
            <StarsRating value={rating} />
          </div>
          <p className="product_price pd-price">
            <span>{el?.price?.split(".")[0]}</span>LE
          </p>
          <div className="product_quantity">
            {t("product_quantity_title")} {el?.stock}
          </div>
          <Line
            percent={(el?.stock / el?.total_stock) * 100}
            strokeWidth={3}
            trailWidth={4}
            strokeColor={"#ffb61e"}
            className="p-2 w-50"
          />
          <Link
            id="prod-det"
            href={`/store/product/${el?.slug}`}
            onClick={() =>
              scrollTo({
                top: 0,
                left: 0,
              })
            }
          >
            {t("details_btn")}
          </Link>
          <span
            className={`product_condition ${
              el?.condition === "new"
                ? "new"
                : el?.condition === "hot"
                ? "hot"
                : ""
            }`}
          >
            {el?.condition === "new"
              ? t("new")
              : el?.condition === "hot"
              ? t("hot")
              : ""}
          </span>
        </div>
        <div className="product_copone">
          <p>{el.copon}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
