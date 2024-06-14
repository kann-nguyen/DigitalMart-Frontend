import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../../../components/hooks/useFetchData";
import { getAllOrder } from "../../../redux/apis/order-api";
import { BsEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import BreadCrumb from "../../../components/common/BreadCrumb";
import Meta from "../../../components/common/Meta";
import { formatDate } from "../../../redux/config";

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allOrders } = useSelector((state) => state.orders);
  const isFetched = useFetchData(() => [dispatch(getAllOrder())]);
  let i = 1;

  // const handleClick = (orderId) => {
  //   const myOrder = allOrders.find((order) => order.orderId === orderId);
  //   localStorage.setItem("myOrder", JSON.stringify(myOrder));
  //   navigate("details");
  // };
  const handleClick = (id) => {
    // const myOrder = allOrders.find((order) => order._id === _id);
    // localStorage.setItem("myOrder", JSON.stringify(myOrder));
    navigate(`details/${id}`);
  };
  return (
    <div className={`${styles.order_admin}`}>
      <BreadCrumb title="Orders" />
      <Meta title="Orders" />
      <div className="mx-4">
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
            {/* <tr>
                    <th scope="row">{i++}</th>
                    <td>foiweoiae</td>
                    <td>username</td>
                    <td>0</td>
                    <td>2i3o</td>
                    <td className="">
                      <button
                        className="border-0 bg-transparent"
                      onClick={() => handleClick()}>
                        <BsEyeFill
                          className={`fs-5 text-dark ${styles.action}`}
                        />
                      </button>
                    </td>
                  </tr> */}
            {isFetched &&
              allOrders.map((order) => {
                return (
                  <tr key={order._id} className={styles.tr}>
                    <th scope="row">{i++}</th>
                    <div className="d-flex align-item-center">
                      <td>{order._id}</td>
                    </div>
                    <td>{order.user}</td>
                    <td>₫ {order.totalPrice.toLocaleString("vi-VN")}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td className="">
                      <button
                        className="border-0 bg-transparent"
                        onClick={() => handleClick(order._id)}
                      >
                        <BsEyeFill
                          className={`fs-5 text-dark ${styles.action}`}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderAdmin;
