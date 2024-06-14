import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
    const { id, name, description, price, images, brand } = props;
    return (
        <div className="product-card position-relative">
            <Link to={`/products/${id}`}>
                <div className="product-image">
                    <img src={images} alt={name} onError={(e) => e.target.src = 'default-image.jpg'} />
                </div>
                <div className="product-details">
                    <h6 className="brand">{brand}</h6>
                    <h5 className="product-title">{name}</h5>
                    <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                    <p className="description">{description}</p>
                    <p className="price">{price}</p>
                </div>
            </Link>
        </div>
    );
}

// Add your CSS styles for the ProductCard component here
