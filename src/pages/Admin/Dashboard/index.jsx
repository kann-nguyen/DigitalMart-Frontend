import { useDispatch, useSelector } from 'react-redux'
import useFetchData from '../../../components/hooks/useFetchData'
import RecentOrders from './RecentOrders'
import Statistic from './Statistic'
import './style.scss'
import { getNumberOfUsers } from '../../../redux/apis/user-api'
import { getAllProduct, getAllProductByAdmin } from '../../../redux/apis/product-api'
import { getAllCategory } from '../../../redux/apis/category-api'
import { getAllOrder } from '../../../redux/apis/order-api'
import DailyRevenueChart from './DailyRevenueChart'

const Dashboard = () => {
    const dispatch = useDispatch();
    const isFetched = useFetchData(() => [dispatch(getNumberOfUsers()), dispatch(getAllProductByAdmin()), dispatch(getAllCategory()), dispatch(getAllOrder())]);
    const { numberOfUsers, numberOfProducts, numberOfCategories, numberOfOrders, orders } = useSelector(state => {
        return {
            numberOfUsers: state.user.numberOfUsers,
            numberOfProducts: state.products.products.length,
            numberOfCategories: state.categories.categories.length,
            numberOfOrders: state.orders.allOrders.length,
            orders: state.orders.allOrders
        }
    })
    return (
        <>
            {isFetched && (
                <div className='dashboard'>
                    <Statistic numberOfUsers={numberOfUsers} numberOfProducts={numberOfProducts} numberOfCategories={numberOfCategories} numberOfOrders={numberOfOrders} />
                    <DailyRevenueChart orders={orders}/>
                    <RecentOrders />
                </div>
            )}

        </>
    )
}

export default Dashboard