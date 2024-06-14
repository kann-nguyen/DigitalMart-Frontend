import './style.scss'
import { IoEyeOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { RiBillFill } from "react-icons/ri";

const Statistic = ({ numberOfUsers, numberOfProducts, numberOfCategories, numberOfOrders }) => {
    return (
        <div className='statistic'>
            <div className='statistic-item'>
                <div className='text-center'>
                    <div style={{ fontSize: 30 }}>{numberOfUsers}</div>
                    <div style={{ color: '#888' }}>Users</div>
                </div>
                <FaUser className='statistic-item-icon' />
            </div>
            <div className='statistic-item'>
                <div>
                    <div style={{ fontSize: 30 }}>{numberOfProducts}</div>
                    <div style={{ color: '#888' }}>Products</div>
                </div>
                <FaProductHunt className='statistic-item-icon' />
            </div>
            <div className='statistic-item'>
                <div>
                    <div style={{ fontSize: 30 }}>{numberOfCategories}</div>
                    <div style={{ color: '#888' }}>Categories</div>
                </div>
                <BiSolidCategoryAlt className='statistic-item-icon' />
            </div>
            <div className='statistic-item'>
                <div>
                    <div style={{ fontSize: 30 }}>{numberOfOrders}</div>
                    <div style={{ color: '#888' }}>Orders</div>
                </div>
                <RiBillFill className='statistic-item-icon' />
            </div>

        </div>
    )
}

const StatisticItem = () => {
    return (
        <div></div>
    )
}

export default Statistic;