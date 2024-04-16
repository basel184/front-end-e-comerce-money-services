"use client";
import { Provider } from "react-redux";
import { store } from "./index";
import TokenContextProvider from "../app/Context/tokenContext";
import { CartProvider } from "react-use-cart";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartProvider>
        <TokenContextProvider>{children}</TokenContextProvider>
      </CartProvider>
    </Provider>
  );
}
