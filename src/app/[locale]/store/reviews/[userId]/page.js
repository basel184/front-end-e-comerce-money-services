"use client";
import "@/src/Style/Store.css";
import { useEffect, useState } from "react";
import StarsRating from "react-star-rate";

export default function Reviews({ params: { userId } }) {
  const [review, setReview] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch(
      `https://moneyservices.store/back/public/api/product-detail/${userId}?user_id=1`
    )
      .then((res) => {
        return res.json();
      })
      .then((review) => {
        setReview(review?.product_detail?.get_review);
      });
  }, [userId]);
  return (
    <>
      <div className="review_overly">
        <div className="container">
          <h4>reviews for {userId}</h4>
          <ul>
            {review?.map((el) => {
              return (
                <li key={el.id}>
                  <h4>{el?.review}</h4>
                  <StarsRating value={el?.rate} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
