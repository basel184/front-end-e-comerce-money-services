/* eslint-disable @next/next/no-img-element */
export default function CustomSale({ img, head, info, name, price }) {
  return (
    <div className={name}>
      <div className="info">
        <h4>{head}</h4>
        <p dangerouslySetInnerHTML={{ __html: info }}></p>

        {/* <p>{price}LE</p> */}
      </div>
      <img src={`${img}`} alt="" />
    </div>
  );
}
