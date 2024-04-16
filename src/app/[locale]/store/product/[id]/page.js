import SingleProduct from "@/src/components/store/singleProd";

export async function generateMetadata({ params }, parent) {
  // read route params
  const id = params.id;
  let user = null;

  if (typeof window !== "undefined") {
    user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  }

  // fetch data
  const product = await fetch(
    `https://moneyservices.store/back/public/api/product-detail/${id}?user_id=${
      user?.user?.id ? user?.user?.id : user?.id
    }`
  );

  const data = await product.json();
  return {
    title: data?.product_detail?.title,
  };
}
function Product({ params: { id } }) {
  return (
    <>
      <SingleProduct id={id} />
    </>
  );
}

export default Product;
