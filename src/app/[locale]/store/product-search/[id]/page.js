import SearchProducts from "@/src/components/store/product-search";

export async function generateMetadata({ params }, parent) {
  return {
    title: params.id,
  };
}
export default function page() {
  return <SearchProducts />;
}
