import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { searchProduct } from "../Redux/Reducers/ProductsSearch";
import { useRouter } from "../utils/navigation";
export default function CustomSearch({ setSearch }) {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();

  const formikObj = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      dispatch(searchProduct(values.search));
      router.push(`/store/product-search/${values.search}/`);

      setSearch(false);
      document.body.style.overflow = "auto";
    },
  });
  return (
    <div className="custom-search">
      <form action="" onSubmit={formikObj.handleSubmit}>
        <input
          type="search"
          placeholder="Search..."
          name="search"
          value={formikObj.values.search}
          onChange={formikObj.handleChange}
        />
        <button className="" type="submit">
          {t("search_btn")}
        </button>
      </form>
      <div
        onClick={() => {
          setSearch(false);
          document.body.style.overflow = "auto";
        }}
        className="close-btn"
      >
        x
      </div>
    </div>
  );
}
