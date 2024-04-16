/* eslint-disable @next/next/no-img-element */
"use client";
import "@/src/Style/Header.css";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useLayoutEffect, useState } from "react";
import CustomSearch from "./CustomSearch";
import { useContext } from "react";
import { useCart } from "react-use-cart";
import "bootstrap/dist/js/bootstrap.js";

import axios from "axios";
import { faUser, faHeart, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Link, usePathname, useRouter } from "../utils/navigation";
import { useLocale, useTranslations } from "next-intl";
import { tokenContext } from "../app/Context/tokenContext";

function Header() {
  const logo = "/assets/images/L3.3.png";
  const CartImg = "/assets/images/cart.png";
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  let ttt = useContext(tokenContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  function logOut() {
    if (isClient) {
      localStorage.removeItem("token");
      ttt.setToken(null);
      router.push("/");
      localStorage.removeItem("user");
    }
  }

  const { totalItems, items } = useCart();
  const [search, setSearch] = useState(false);
  const [state, setState] = useState(false);
  const t = useTranslations();
  const [info, setInfo] = useState({});

  const user =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const lang = locale;

  console.log(lang);
  console.log("ITEMs", items?.length);
  const [userCops, setUserCops] = useState();

  const fetchUserCopuns = async () => {
    const response = await axios.get(
      `https://moneyservices.store/back/public/api/profile-user?user_id=${
        user?.id || user?.user?.id
      }`
    );

    /* const response = await axios.get(
      `https://moneyservices.store/back/public/api/profile-user?user_id=${5}`
    );
 */
    setUserCops(response.data.my_copon);
    localStorage.setItem(
      "coupons",
      JSON.stringify({
        userID: user?.id || user?.user?.id,
        coupons: response.data.my_copon,
      })
    );
  };

  useEffect(() => {
    fetchUserCopuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/profile-user?user_id=${
        user?.user?.id ? user?.user?.id : user?.id
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfo(data?.profile);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    isClient && (
      <>
        <div className="header py-3 ">
          <div className="container d-flex justify-content-between align-items-center">
            <Link href={"/"}>
              <div className="logo cust-logo">
                <img src={logo} alt="" className="i-logo " />
                <span>{t("logo")}</span>
              </div>
            </Link>

            <div className="links">
              <Link className={`me-2 nav-links`} href={"/"}>
                {t("header_link_home")}
              </Link>
              <Link className="me-2 nav-links" href={"/store"}>
                {t("header_link_shop")}
              </Link>
              <Link className="me-2 nav-links" href={"/draws"}>
                {t("header_link_draws")}
              </Link>
              <Link className="me-2 nav-links" href={"/winners"}>
                {t("header_link_winners")}
              </Link>
              {/* <Link className="me-2 nav-links" href="/blog">
              {t("header_link_blog")}
            </Link> */}
              <Link className="me-2 nav-links" href={"/about-us"}>
                {t("header_link_about")}
              </Link>
              <Link className="me-2 nav-links" href={"/contact"}>
                {t("header_link_contact")}
              </Link>
            </div>
            <div className="operation">
              <div
                className="search"
                onClick={() => {
                  setSearch(true);
                  setState(false);
                  document.body.style.overflow = "hidden";
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <div>
                {/* Render content based on language */}
                {lang === "en" && (
                  <button
                    onClick={() => {
                      router.replace(pathname, { locale: "ar" });
                      localStorage.setItem("lng", "ar");
                    }}
                    style={{
                      border: "none",
                      margin: "0 6px",
                      backgroundColor: "transparent",
                      width: "50px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0",
                    }}
                  >
                    <span>AR</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Egypt_%28variant%29.png/1200px-Flag_of_Egypt_%28variant%29.png"
                      alt="egypt flag"
                      style={{
                        width: "24px",
                      }}
                    />
                  </button>
                )}
                {lang === "ar" && (
                  <button
                    onClick={() => {
                      router.replace(pathname, { locale: "en" });
                      localStorage.setItem("lng", "en");
                    }}
                    style={{
                      border: "none",
                      margin: "0 6px",
                      backgroundColor: "transparent",
                      width: "50px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0",
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
                      alt="England flag"
                      style={{
                        width: "24px",
                      }}
                    />
                    <span>EN</span>
                  </button>
                )}
              </div>

              {/*   <select
              name=""
              id=""
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                localStorage.setItem("lng", e.target.value);
              }}
              className="bg-transparent mx-2 d-flex lan_select"
              style={{ border: "none" }}
            >
              <option value="english">ENGLISH</option>

              <option value="arabic">ARABIC </option>
            </select>
 */}

              <Link href={"/cart"} className="cart-item">
                {isClient && (
                  <span className="cart_total">{items?.length}</span>
                )}
                {t("header_cart_item")}
                <img
                  src={CartImg}
                  style={{
                    margin: locale === "en" ? "0 2px 0 6px" : "0 6px 0 2px",
                  }}
                  alt=""
                />
              </Link>

              {user ? (
                <div
                  style={{
                    backgroundColor: "#ffb61e",
                    borderRadius: "5px",
                    margin: "0 6px",
                    padding: "2px",
                  }}
                >
                  <span
                    style={{
                      padding: "5px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {userCops}
                  </span>
                  <img
                    src="https://seekicon.com/free-icon-download/ticket_14.svg"
                    alt="England flag"
                    style={{
                      margin: "0 5px",
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {user ? (
                <div className="user_account">
                  <button
                    // className=" dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <img src={info?.photo} alt="" className="mx-1" /> */}
                    <img
                      style={{
                        width: "20px",
                      }}
                      src={
                        "https://pic.onlinewebfonts.com/thumbnails/icons_369412.svg"
                      }
                      alt=""
                      className="mx-1"
                    />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link href={"/account"} className="dropdown-item">
                        {t("user_tag")}
                        <FontAwesomeIcon icon={faUser} className="mx-2" />

                        {/*     <img
                        src={faUser}
                        style={{
                          margin:
                            i18n.language === "en"
                              ? "0 2px 0 6px"
                              : "0 6px 0 2px",
                        }}
                        alt=""
                      /> */}
                      </Link>
                    </li>
                    <li>
                      <Link href={"/wish-list"} className="dropdown-item">
                        {t("user_fav")}
                        <FontAwesomeIcon icon={faHeart} className="mx-2" />
                      </Link>
                    </li>
                    <li>
                      <Link href={"/copouns"} className="dropdown-item">
                        {t("header_user_setting")}

                        <FontAwesomeIcon icon={faTicket} className="mx-2" />
                      </Link>
                    </li>
                    <li>
                      <Link href={"/orders"} className="dropdown-item">
                        {t("header_user_orders")}

                        <FontAwesomeIcon icon={faSearch} className="mx-2" />
                      </Link>
                    </li>
                    <li>
                      <button className="account_exit" onClick={logOut}>
                        {t("header_nav_link")}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href={"/login"} className="user">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  {t("header_user")}
                </Link>
              )}
            </div>
            <div
              className="burger-icon"
              onClick={() => {
                setState(!state);
                document.body.style.overflow = "hidden";
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </div>
        {search && <CustomSearch setSearch={setSearch} />}
        {state && (
          <div className="mobile-screen">
            <div
              className="close-btn"
              onClick={() => {
                setState(false);
                document.body.style.overflow = "auto";
              }}
            >
              x
            </div>
            <div className="container">
              <div className="links">
                <Link
                  className="me-2 nav-links"
                  onClick={() => {
                    setState(false);
                    document.body.style.overflow = "auto";
                  }}
                  href="/"
                >
                  {t("header_link_home")}
                </Link>
                <Link
                  className="me-2 nav-links"
                  onClick={() => {
                    setState(false);
                    document.body.style.overflow = "auto";
                  }}
                  href={"/store"}
                >
                  {t("header_link_shop")}
                </Link>

                <Link
                  className="me-2 nav-links"
                  onClick={() => {
                    setState(false);
                    document.body.style.overflow = "auto";
                  }}
                  href={"/draws"}
                >
                  {t("header_link_draws")}
                </Link>

                <Link
                  className="me-2 nav-links"
                  onClick={() => {
                    setState(false);
                    document.body.style.overflow = "auto";
                  }}
                  href={"/winners"}
                >
                  {t("header_link_winners")}
                </Link>

                {/*     <Link
                className="me-2 nav-links"
                onClick={() => {
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                href="/blog"
              >
                {t("header_link_blog")}
              </Link> */}
                <Link
                  className="me-2 nav-links"
                  onClick={() => {
                    setState(false);
                    document.body.style.overflow = "auto";
                  }}
                  href={"/about-us"}
                >
                  {t("header_link_about")}
                </Link>
                <Link
                  className="me-2 nav-links"
                  onClick={() => {
                    setState(false);
                    document.body.style.overflow = "auto";
                  }}
                  href={"/contact"}
                >
                  {t("header_link_contact")}
                </Link>
              </div>
              <div className="operation">
                <div
                  className="search"
                  onClick={() => {
                    setSearch(true);
                    setState(false);
                    document.body.style.overflow = "hidden";
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                {/* <select
                name=""
                id=""
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                  localStorage.setItem("lng", e.target.value);
                  setState(false);
                  document.body.style.overflow = "auto";
                }}
                className="bg-transparent mx-2"
                style={{ border: "none" }}
              >
                <option value="english">ENGLISH</option>
                <option value="arabic">ARABIC</option>
              </select> */}
                {/* Render content based on language */}
                {lang === "en" && (
                  <button
                    onClick={() => {
                      router.replace(pathname, { locale: "ar" });
                      localStorage.setItem("lng", "ar");
                    }}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      width: "50px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      padding: "0",
                    }}
                  >
                    <span>AR</span>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Egypt_%28variant%29.png/1200px-Flag_of_Egypt_%28variant%29.png"
                      alt="egypt flag"
                      style={{
                        width: "24px",
                      }}
                    />
                  </button>
                )}
                {lang === "ar" && (
                  <button
                    onClick={() => {
                      router.replace(pathname, { locale: "en" });
                      localStorage.setItem("lng", "en");
                    }}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      width: "50px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      padding: "0",
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
                      alt="England flag"
                      style={{
                        width: "24px",
                      }}
                    />
                    <span>EN</span>
                  </button>
                )}
                <Link
                  href={"/cart"}
                  className="cart-item"
                  onClick={() => {
                    setState(false);
                    document.body.style.overflow = "auto";
                  }}
                >
                  <span className="me-1">{items?.length}</span>
                  {t("header_cart_item")}
                  <img
                    src={CartImg}
                    style={{
                      margin: locale === "en" ? "0 2px 0 6px" : "0 6px 0 2px",
                    }}
                    className="ms-1"
                    alt=""
                  />
                </Link>

                {isClient && localStorage.getItem("user") && (
                  <div
                    style={{
                      backgroundColor: "#ffb61e",
                      borderRadius: "5px",
                      margin: "0 6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 8px",
                      width: "fit-content",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {userCops}
                    </span>
                    <img
                      src="https://seekicon.com/free-icon-download/ticket_14.svg"
                      alt="England flag"
                      style={{
                        marginRight: "8px",
                      }}
                    />
                  </div>
                )}
                {isClient && localStorage.getItem("token") ? (
                  <div className="user_account">
                    <button
                      className=" dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={info?.photo} alt="" className="mx-1" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <Link
                          href={"/account"}
                          className="dropdown-item"
                          onClick={() => {
                            setState(false);
                            document.body.style.overflow = "auto";
                          }}
                        >
                          {t("user_tag")}
                          <FontAwesomeIcon icon={faUser} className="mx-2" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/wish-list"}
                          className="dropdown-item"
                          onClick={() => {
                            setState(false);
                            document.body.style.overflow = "auto";
                          }}
                        >
                          {t("user_fav")}
                          <FontAwesomeIcon icon={faHeart} className="mx-2" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/copouns"}
                          className="dropdown-item"
                          onClick={() => {
                            setState(false);
                            document.body.style.overflow = "auto";
                          }}
                        >
                          {t("header_user_setting")}
                          <FontAwesomeIcon icon={faTicket} className="mx-2" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/Orders"}
                          onClick={() => {
                            setState(false);
                            document.body.style.overflow = "auto";
                          }}
                          className="dropdown-item"
                        >
                          {t("header_user_orders")}
                          <FontAwesomeIcon icon={faSearch} className="mx-2" />
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="account_exit"
                          onClick={() => {
                            setState(false);
                            document.body.style.overflow = "auto";
                            logOut();
                          }}
                        >
                          {t("header_nav_link")}
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={"/login"}
                    className="user"
                    onClick={() => {
                      setState(false);
                      document.body.style.overflow = "auto";
                    }}
                  >
                    <img src={faUser} alt="" />
                    {/* <FontAwesomeIcon icon={faUser} className="me-1" /> */}
                    {t("header_user")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  );
}

export default Header;
