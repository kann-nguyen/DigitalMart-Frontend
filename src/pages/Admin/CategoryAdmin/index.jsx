import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../redux/apis/category-api";
import { Link } from 'react-router-dom';
import './style.scss'
import useFetchData from "../../../components/hooks/useFetchData";
const CategoryAdmin = () => {
    const dispatch = useDispatch();
    const isFetched = useFetchData(() => [dispatch(getAllCategory())]);
    const categories = useSelector((state) => state.categories.categories);

    localStorage.setItem("categories", JSON.stringify(categories));
    const renderCategoryList = () => {
        return categories.map((item, index) => {
            return (
                <Link
                key={index}
                to={`/admin/category/${item._id}`} // Assuming you have a unique id for each category
                className="category-item-link"
                >
                <div className="category-item">
                    <img src={item.image}  alt="" />
                    <div>{item.name}</div>
                </div>
            </Link>
            )
        })
    }
    return (
        <div className="category">
            <div className="header">
                <h1>Category</h1>
                <Link to='/admin/category/create'>
                    <button className="new-category-btn">+ New Category</button>
                </Link>
                
            </div>
            <div className="item-list">
                {isFetched && renderCategoryList()}
            </div>
        </div>
    )
}


export default CategoryAdmin;