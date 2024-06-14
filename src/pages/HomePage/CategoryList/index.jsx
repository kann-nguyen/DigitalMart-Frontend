import { useNavigate } from 'react-router-dom'
import './CategoryList.scss'

const CategoryList = ({ categories }) => {
    const navigate = useNavigate();
    const list = categories.map((item, index) => {
        return (
            <div key={index} className="d-flex flex-column align-items-center p-2 justify-content-between category-list-item"
                onClick={() => navigate(`/product-search-page?category=${item._id}`)}
            >
                <img src={item.image}
                    className="rounded-circle" />
                <p className="mb-0">{item.name}</p>
            </div>
        )
    })
    return (
        <div className="d-flex flex-column flex-wrap align-content-start category-list">
            {list}
        </div>
    )
}

export default CategoryList;