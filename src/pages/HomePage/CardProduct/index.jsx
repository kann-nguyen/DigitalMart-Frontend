import "bootstrap/dist/js/bootstrap.min.js"
import { useEffect } from "react"
import './CardProduct.scss'
import { useNavigate } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"

export const CardProduct = ({ product, width, height }) => {
    // useEffect(() => {
    //     const intervalId = setInterval(function () {
    //         const id = img-carousel-${product._id}
    //         // console.log(id);
    //         let carousel = document.getElementById(id);
    //         let carouselInstance = bootstrap.Carousel.getInstance(carousel);
    //         console.log(carouselInstance)
    //         carouselInstance.next();
    //         console.log("running")
    //     }, 1000);
    //     return () => clearInterval(intervalId)
    // }, [])
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product-detail/${product._id}`, {
            state: product
        })
    }
    return (
        <div className="card" style={{ width: width, height: height, cursor: 'pointer' }} onClick={handleClick}>
            <div id={`img-carousel-${product._id}`} className="carousel slide card-img-top" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div key={0} className="carousel-item active img-wrapper">
                        <img src={product.images[0]} className="d-block w-100" alt="..." />
                    </div>
                    <div key={1} className="carousel-item img-wrapper">
                        <img src={product.images[1]} className="d-block w-100" alt="..." />
                    </div>
                    {/* {product.images.slice(1).map((item, index) => {
                        return <div key={index} className="carousel-item img-wrapper" data-bs-interval="1000">
                            <img src={item} className="d-block w-100" alt="..." />
                        </div>
                    })} */}
                    {/* <button className="carousel-control-prev" type="button" data-bs-target={`#img-carousel-${product._id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#img-carousel-${product._id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> */}
                </div>
            </div>

            <div className="card-body">
                <h5 className="card-title text-truncate">{product.name}</h5>
                <p className="card-text text-secondary text-truncate"
                >
                    {product.description}
                </p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                <p className="card-text text-info">{product.price.toLocaleString('vi-VN')} <span className="text-decoration-underline">đ</span></p>
            </div>
        </div>
    )
}

export default CardProduct;
