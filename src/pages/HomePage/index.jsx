import { useDispatch, useSelector } from 'react-redux';
// import CategoryList from './CategoryList';
import './HomePage.scss'
import useFetchData from '../../components/hooks/useFetchData';
import { getAllCategory } from '../../redux/apis/category-api';
import { getTenProductPerCategory } from '../../redux/apis/product-api';
// import ProductCategory from './ProductCategory';
// import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import CategoryList from './CategoryList';
import ProductCategory from './ProductCategory';

const HomePage = () => {
    const dispatch = useDispatch();
    const isFetched = useFetchData(() => [dispatch(getAllCategory()), dispatch(getTenProductPerCategory())]);
    const categories = useSelector(state => state.categories.categories);
    const productOfCategory = useSelector(state => state.categories.productOfCategory);
    const renderProductCategory = () => {
        return productOfCategory
            .filter(item => item.tenProduct.length > 0)
            .map((item, index) => {
                return <ProductCategory category={item.category} products={item.tenProduct} />
            })
    }
    return (
        <div>
            {/* asdfasdf */}
            <div id="ads-image" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#ads-image" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#ads-image" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#ads-image" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#ads-image" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#ads-image" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                        <img src="https://res.cloudinary.com/dumhujhqd/image/upload/v1717237031/digital-mart/decor-img4_dejgoq.webp" className="w-100" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://res.cloudinary.com/dumhujhqd/image/upload/v1717237031/digital-mart/decor-img3_wrapa7.webp" className="d-block w-100" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://res.cloudinary.com/dumhujhqd/image/upload/v1717237017/digital-mart/decor-img2_rm4dhh.webp" className="d-block w-100" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://res.cloudinary.com/dumhujhqd/image/upload/v1717237015/digital-mart/decor-img1_z6sogh.webp" className="d-block w-100" />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://res.cloudinary.com/dumhujhqd/image/upload/v1717237014/digital-mart/decor-img5_jcxten.webp" className="d-block w-100" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#ads-image" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#ads-image" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {isFetched && (
                <div>
                    <div className="container bg-light normal-height mt-3" style={{ padding: 0 }}>
                        <p className='p-2 fs-5'>Danh mục</p>
                        <CategoryList categories={categories} />
                    </div>
                    <div className="container bg-light mt-3">
                        {renderProductCategory()}
                    </div>
                </div>
            )}

        </div>
    )
}

export default HomePage;
