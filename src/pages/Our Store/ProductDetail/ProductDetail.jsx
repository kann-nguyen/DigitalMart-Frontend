import React, {  useState, useEffect } from 'react'
import "./style.css";
import ThumbNail from './ThumbNail';
import ReactStars from "react-rating-stars-component";
import Meta from '../Meta';
import BreadCrumb from '../../../components/common/BreadCrumb';


const ProductDetail = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const increment = () => {
      setQuantity(quantity + 1);
    };
    const decrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);

      return () => clearInterval(timer);
    }, [images.length, interval]);

    const handleThumbnailClick = (index) => {
      setCurrentIndex(index);
    };
    const addToCart = () => {
        
        console.log(`Add ${quantity} product(s) to cart `);
    };
    return (
      <>
        <Meta title={"Product Details"} />
        <BreadCrumb title="Product/Product Details" />
        <div className="detail">
          <div className="row">
            <div className="col-4">
              <div className="slider">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`slide ${
                      index === currentIndex ? "active" : ""
                    }`}
                  >
                    <img src={image} alt={`Slide ${index}`} />
                  </div>
                ))}
              </div>
              <ThumbNail
                images={images}
                onThumbnailClick={handleThumbnailClick}
              />
            </div>
            <div className="col-8">
              <div className="content">
                <h2>Kids headphone bulk 10 pack multi colored for students</h2>
                <ReactStars
                  count={5}
                  value={4}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
                <div className='price'>
                    <p>100$</p>
                </div>
                <div>
                  <p> Total</p>
                  <button className="quantity-button" onClick={decrement}>
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button className="quantity-button" onClick={increment}>
                    +
                  </button>
                  <p>10 available</p>
                </div>
                <div>
                  <button className="add-to-cart" onClick={addToCart}>
                    <img
                      src="../images/cart.svg"
                      alt="basket"
                      className="bg-transparent"
                    />
                    <p className="bg-transparent">Add to cart</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="detail">
            <div className="content">
                <h2>Details</h2>
            </div>
          </div>
          <div className="detail">
            <div className="content">
                <h2>Description</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis ut doloribus exercitationem maiores perferendis, impedit assumenda odio incidunt accusantium recusandae sint nihil architecto. A, soluta error. Nulla, optio. Aliquam, error.</p>
            </div>
          </div>
        </div>
      </>
    );
}

export default ProductDetail