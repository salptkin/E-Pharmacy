import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCustomerReviews } from "../../../redux/pharmacy/selectors";
import { getCustomerReviews } from "../../../redux/pharmacy/operations";
import { useMediaQuery } from "react-responsive";
import styles from "./Reviews.module.css";

const mockReviews = [
  {
    _id: "1",
    name: "Sarah Johnson",
    photo: "https://i.pravatar.cc/150?img=1",
    testimonial: "E-Pharmacy made it so easy to find the medicines I need. Fast delivery and great customer service!"
  },
  {
    _id: "2",
    name: "Michael Chen",
    photo: "https://i.pravatar.cc/150?img=13",
    testimonial: "The best online pharmacy I've used. Reliable, affordable, and always in stock. Highly recommended!"
  },
  {
    _id: "3",
    name: "Emma Williams",
    photo: "https://i.pravatar.cc/150?img=5",
    testimonial: "Quick and convenient service. The mobile app is user-friendly and delivery is always on time!"
  }
];

const Reviews = () => {
  const dispatch = useDispatch();
  const apiReviews = useSelector(selectCustomerReviews);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1439px)",
  });
  const reviewsLimit = isMobile ? 1 : isTablet ? 2 : 3;

  useEffect(() => {
    dispatch(
      getCustomerReviews({
        limit: reviewsLimit,
      })
    );
  }, [dispatch, reviewsLimit]);

  const reviews = apiReviews && apiReviews.length > 0 
    ? apiReviews 
    : mockReviews.slice(0, reviewsLimit);

  const getAvatarUrl = (review) => {
    if (review.photo && review.photo.startsWith('http')) {
      return review.photo;
    }
    const name = encodeURIComponent(review.name || 'User');
    return `https://ui-avatars.com/api/?name=${name}&background=59b17a&color=fff&size=150&bold=true`;
  };

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Reviews</h2>
        <p className={styles.text}>Search for Medicine, Filter by your location</p>
        <ul className={styles.list}>
          {reviews?.map((review, index) => (
            <li key={review._id} className={styles.item}>
              <div className={styles.imgBox}>
                <img 
                  src={getAvatarUrl(review, index)} 
                  alt={review.name || 'User'} 
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name || 'User')}&background=59b17a&color=fff&size=150&bold=true`;
                  }}
                />
              </div>
              <h3 className={styles.name}>{review.name}</h3>
              <p className={styles.testimonial}>{review.testimonial}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reviews;
