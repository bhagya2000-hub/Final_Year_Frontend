import React from 'react';
import StarRating from "react-star-ratings";

function ListReview({ reviews }) {  // Add the reviews prop here
  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews?.map((review) => (
        <div key={review?._id} className="review-card my-3">
          <div className="row">
            <div className="col-1">
              <img
                src={review?.user?.avatar ? review?.user?.avatar?.url : "../images/default_avatar.jpg"}
                alt="User Name"
                width="50"
                height="50"
                className="rounded-circle"
              />
            </div>
            <div className="col-11">
              <StarRating
                rating={review.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="15px"
                starSpacing="1px"
              />
              <p className="review_user">{review.user?.name}</p>
              <p className="review_comment">{review?.comments}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ListReview;