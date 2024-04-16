/* eslint-disable react/prop-types */
export default function SingleProductDesc({ desc }) {
  return (
    <p className="product_desc" dangerouslySetInnerHTML={{ __html: desc }}></p>
  );
}
