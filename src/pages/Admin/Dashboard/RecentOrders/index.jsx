import { useNavigate } from 'react-router-dom'
import './style.scss'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../../redux/config'
import { BsEyeFill } from "react-icons/bs";

const RecentOrders = () => {
    const navigate = useNavigate()
    const orders = useSelector(state => state.orders.allOrders);
    let sortedOrders = [...orders]
    sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const latestOrders = sortedOrders.slice(0, 10);
    const handleClick = (id) => {
        navigate(`/admin/order/details/${id}`);
    };
    return (
        <div className='recentord'>
            <div className='recentord-title'>
                <h5>Recent Orders</h5>
                <div onClick={() => navigate('order')}>View All</div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">OrderId</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Create At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {latestOrders.map((order, i) => {
                        return (
                            <tr key={order._id}>
                                <th scope="row">{i + 1}</th>
                                <td>{order._id}</td>
                                <td>{order.user}</td>
                                <td>₫ {order.totalPrice.toLocaleString("vi-VN")}</td>
                                <td>{formatDate(order.createdAt)}</td>
                                <td className="">
                                    <button
                                        className="border-0 bg-transparent"
                                        onClick={() => handleClick(order._id)}
                                    >
                                        <BsEyeFill
                                            className={`fs-5 text-dark`}
                                        />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

const RecentOrderItem = () => {
    return (
        <div></div>
    )
}

export default RecentOrders;