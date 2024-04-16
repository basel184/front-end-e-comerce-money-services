import { configureStore } from "@reduxjs/toolkit";
import products from "./Reducers/Products";
import categories from "./Reducers/categories";
import singleProduct from "./Reducers/SingleProduct";
import posts from "./Reducers/Posts";
import home from "./Reducers/Home";
import blog from "./Reducers/blog"
import search from "./Reducers/ProductsSearch"
import wishList from "./Reducers/wishList"
import value from "./Reducers/disconteCode"

export const store = configureStore({
  reducer: {
    products,
    categories,
    singleProduct,
    posts,
    home,
    blog,
    search,
    wishList,
    value
  },
});
