import CustomSale from "./CustomSale";

export default function Sale({ data }) {
  return (
    <div className="sale pt-4 pb-4">
      <div className="container">
        <div className="row">
          {data?.map((el) => {
            return (
              <div
                className="col-lg-4 cpl-md-6 col-sm-12"
                key={`Sale____Key__${el?.id}`}
              >
                <div className="box mt-4">
                  <a href={`${el?.link}`}>
                    <CustomSale
                      img={el?.photo}
                      head={el?.title}
                      info={el?.id !== 2 ? el?.description : ""}
                      name={`sale_${el?.id}`}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
