import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname==="/products") {
      navigate('product_detail');
    }
    else {
      navigate('products/product_detail'); // điều hướng đến trang mới
    }
    
  };

  return (
    <div className={`${location.pathname === "/products" ? `gr-${grid}` : "col-3"}`}>
      <div className="product-card position-relative">
        <div onClick={handleClick}>
          <img src="../images/watch.jpg" alt="" className='img-fluid'/>
        </div>
        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphone bulk 10 pack multi colored for students
          </h5>
          <ReactStars
            count={5}
            value={4}
            size={24}
            edit={false}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga
          </p>
          <p className="price">$100.00</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
