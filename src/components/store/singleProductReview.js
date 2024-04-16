/* eslint-disable @next/next/no-img-element */
import "@/src/Style/productReviews.scss";

/* eslint-disable react/prop-types */
export default function SingleProductReview({ reviews }) {
  return (
    <div className="reviews">
      {reviews?.map((el) => {
        return (
          <div className="testimonial-box-container" key={el?.id}>
            {/* BOX-1 */}
            <div className="testimonial-box">
              {/* top */}
              <div className="box-top">
                {/* profile */}
                <div className="profile">
                  {/* img */}
                  <div className="profile-img">
                    <img
                      src={
                        el?.user_info?.photo ||
                        "/assets/images/profile_img.webp"
                      }
                      alt="Profile"
                    />
                  </div>
                  {/* name-and-username */}
                  <div className="name-user">
                    <strong>{el?.user_info?.name}</strong>
                  </div>
                </div>
                {/* reviews */}
                <div className="reviews">
                  {Array.from({ length: el?.rate }).map((_, index) => (
                    <i key={index} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              {/* client-comment */}
              <div className="client-comment">
                <p>{el?.review} </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
