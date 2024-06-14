import { useSelector } from "react-redux";
import CardProduct from "../CardProduct";
import './ProductCategory.scss'
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

const ProductCategory = ({ category, products }) => {
    const scrollContainerRef = useRef(null)
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
            const newScrollLeft = scrollLeft - 100;
            if (newScrollLeft <= 0) {
                scrollContainerRef.current.scrollLeft = scrollWidth / 2 + newScrollLeft;
            } else {
                scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
            }
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
            const newScrollLeft = scrollLeft + 100;
            if (newScrollLeft >= scrollWidth - clientWidth) {
                scrollContainerRef.current.scrollLeft = newScrollLeft - scrollWidth / 2;
            } else {
                scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
            }
        }
    };
    return (
        <div className="mb-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem' }}>{category}</p>
                <div>
                    <button className="arrow-button left" onClick={scrollLeft}>
                        <FaArrowLeft />
                    </button>
                    <button className="arrow-button right" onClick={scrollRight}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>

                <div
                    ref={scrollContainerRef}
                    className="scroll-container"
                >
                    <div className="category-slider">
                        {products.map((item => <CardProduct product={item} width={'250px'} height={'400px'} />))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCategory;