import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import './ProductDetail.scss'
import { useDispatch, useSelector } from "react-redux";
import { updateBasket } from "../../../redux/apis/basket-api";
import { setSelectedItems } from "../../../redux/slices/basketSlice";
import useFetchData from "../../../components/hooks/useFetchData";
import { getProductDetail } from "../../../redux/apis/product-api";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { likeProduct, unlikeProduct } from "../../../redux/apis/favorite-api";
import { getFavorites } from '../../../redux/apis/favorite-api';
import { toast } from "react-toastify";

const ProductDetail = () => {
    // const location = useLocation();
    // const product = location.state;
    // if (!product) {
    //     return <Navigate to='/home-page' />
    // }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { productId } = useParams();
    const isFetched = useFetchData(() => [dispatch(getProductDetail(productId)), dispatch(getFavorites())])
    const { product, inventory } = useSelector(state => {
        return {
            product: state.products.productDetail.product,
            inventory: state.products.productDetail.inventory
        }
    });
    useEffect(() => {
        dispatch(getProductDetail(productId));
        dispatch(getFavorites());
    }, [productId]);
    const isLiked = useSelector(state => {
        const favoriteList = state.favorites.favorites;
        return favoriteList.some(element => element._id === product._id);
    })
    // console.log(isLiked);
    const currentUser = localStorage.getItem('currentUser');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBuy = async () => {
        if (!currentUser) {
            navigate('/auth')
            return;
        }
        dispatch(updateBasket({
            product: product,
            incrementBy: 1
        }))
        dispatch(setSelectedItems([{
            product: product,
            quantity: 1
        }]))
        navigate('/checkout')
    }
    const handleAddToCart = () => {
        if (!currentUser) {
            navigate('/auth')
            return;
        }
        dispatch(updateBasket({
            product: product,
            incrementBy: 1
        }))
            .unwrap()
            .then(result => {
                dispatch(getProductDetail(productId))
            })
            .catch(err => {
                if (!product.isPublished) {
                    toast.error("Sản phẩm hiện không hoạt động")
                } else toast.error("Số lượng sản phẩm quá mức cho phép")
            })
            .finally(() => dispatch(getProductDetail(productId)))

    }
    const handleLikeProduct = () => {
        if (!currentUser) {
            navigate('/auth')
            return;
        }
        dispatch(likeProduct(product));
    }
    const handleUnlikeProduct = () => {
        if (!currentUser) {
            navigate('/auth')
            return;
        }
        dispatch(unlikeProduct(product._id));
    }
    return (
        <div>
            {isFetched && (
                <div>
                    <div className="container bg-light mt-3">
                        <div className="row">
                            <div className="col-5 p-2">
                                <ImageGallery images={product.images} />
                            </div>
                            <div className="col-7 p-2 d-flex flex-column">
                                <div className="mb-5">
                                    <h1>{product.name}</h1>
                                    <p className="fs-5 text-body-secondary">Thương hiệu
                                        <span className="text-primary"> {product.brand} </span>
                                        | {product.isPublished ? '' : <span className="text-danger">Không hoạt động</span>}
                                    </p>
                                    <p className="fs-5 text-primary">{product.price.toLocaleString('vi-VN')} <span>VNĐ</span></p>
                                </div>
                                <p>{inventory.stock} <span className="text-body-secondary">Sản phẩm có sẵn</span></p>
                                <div className="button-group">
                                    <div className="button-group-row">
                                        <div className="button-group-item button-card" onClick={handleAddToCart}>Thêm vào giỏ hàng</div>
                                        <div className="button-group-item button-love"
                                            onClick={!isLiked ? handleLikeProduct : handleUnlikeProduct}
                                        >
                                            {!isLiked ? <FaRegHeart /> : <FaHeart />}
                                        </div>
                                    </div>
                                    <div className="btn btn-primary" onClick={handleBuy}>Mua ngay</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container my-3" style={{ minHeight: '600px', height: 'fit-content' }}>
                        <div className="row">
                            <ProductDescription description={product.description} classes="col-8" />
                            <ProductMetadata metadata={product.metadata}
                                classes="col-4" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const ImageGallery = ({ images }) => {
    const [selectedImg, setMainImage] = useState(images[0]);
    const handleMouseEnter = (image) => {
        setMainImage(image);
    };
    return (
        <div className="image-gallery">
            <div className="main-image">
                <img src={selectedImg} alt="" />
            </div>
            <div className="thumbnail-images">
                {images.map((item, index) => (
                    <img key={index}
                        src={item}
                        className={`thumbnail ${item === selectedImg ? 'active-img' : ''}`}
                        onMouseEnter={() => handleMouseEnter(item)}
                        style={{ cursor: 'pointer', width: '100px', height: 'auto', margin: '5px' }}
                    />
                ))}
            </div>
        </div>
    )
}

const ProductDescription = ({ classes, description }) => {
    return (
        <div className={classes}>
            <div className="product-description">
                <h4>Mô tả sản phẩm</h4>
                <p>{description}</p>
                {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos nisi laborum enim, voluptates non explicabo quam illo amet suscipit ratione aliquam, culpa doloremque illum rerum reprehenderit obcaecati numquam officia dolorum.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus aut voluptatibus iste quaerat, magni voluptas exercitationem unde quod iure odit eveniet quasi. Incidunt, aut. Vero obcaecati earum temporibus mollitia a.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore accusantium dolorem obcaecati saepe sapiente magni ipsam perspiciatis ipsum minus rerum, optio dolor voluptatem veritatis? Asperiores ratione fuga facere voluptatibus labore?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas soluta eligendi odio. Repellat rerum, odit, illo nobis possimus eum atque sunt aliquid ad animi sed laboriosam assumenda facere odio dolore.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas soluta eligendi odio. Repellat rerum, odit, illo nobis possimus eum atque sunt aliquid ad animi sed laboriosam assumenda facere odio dolore.</p> */}
            </div>
        </div>
    )
}

const ProductMetadata = ({ metadata, classes }) => {
    // console.log("metadata", metadata);
    return (
        <div className={classes}>
            <div className="product-metadata">
                <h4>Thông tin chi tiết</h4>
                <table className="table">
                    <tbody>
                        {Object.entries(metadata || {}).map(([key, value], index) => (
                            <tr className={index % 2 === 0 ? 'table-secondary' : ''} key={index}>
                                <td>{key}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductDetail;