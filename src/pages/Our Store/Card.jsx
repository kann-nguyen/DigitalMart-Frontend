import React from 'react'
import ReactStars from "react-rating-stars-component";
const Card = () => {
  return (
    <div className="random-product d-flex">
      <div className="w-50">
        <img src="../images/watch.jpg" className=" img-fluid" alt="" />
      </div>
      <div className="w-50">
        <h5 className="product-title">
          Kids headphone bulk 10 pack multi colored for students
        </h5>
        <ReactStars
          count={5}
          value="1"
          size={24}
          edit={false}
          activeColor="#ffd700"
        />
        <b>$ 300</b>
      </div>
    </div>
  );
}

export default Card