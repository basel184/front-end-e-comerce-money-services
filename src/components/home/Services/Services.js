/* eslint-disable @next/next/no-img-element */

export default function Services({ data }) {
  return (
    <div className="services">
      <div className="container text-center">
        <div className="row justify-content-center">
          {data?.map((el) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                key={`Serv__Key__${el.id}`}
              >
                <div className="box mt-4">
                  <span>
                    <img src={el.photo} alt="" />
                  </span>
                  <div className="info">
                    <h4>{el?.title}</h4>
                    <p>{el?.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
