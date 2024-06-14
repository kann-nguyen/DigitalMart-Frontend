import React from "react";
import Meta from "../../../../components/common/Meta";
import styles from "./styles.module.css";
import useFetchData from "../../../../components/hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../../redux/apis/order-api";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../redux/config";

const OrderDetails = () => {
  let i = 0;
  const { id } = useParams();
  const dispatch = useDispatch();
  const isFetched = useFetchData(() => [dispatch(getOrderById(id))]);
  const orderDetail = useSelector((state) => state.orders.orderDetail);
  console.log(orderDetail);
  return (
    <>
      <Meta title="Order Details" />
      <div className="order-details-wrapper home-wrapper-2 py-5">
        {isFetched && (
          <div className="container-xxl">
            <div className="row">
              <h3
                className={`${styles.bread_crumb}`}
              >{`Order > Order Id ${orderDetail._id}`}</h3>
            </div>
            <div className="row bg-white mx-2 rounded py-4">
              <h4 className="fs-4">Invoice</h4>
              <div className="col-12 d-flex">
                <div className={`${styles.field}`}>
                  <p className={`${styles.label}`}>Order Id</p>
                  <input
                    type="text"
                    value={orderDetail._id}
                    disabled
                    className={`${styles.info_box}`}
                  />
                </div>
                <div className={`${styles.field}`}>
                  <p className={`${styles.label}`}>Create At</p>
                  <input
                    type="text"
                    value={formatDate(orderDetail.createdAt)}
                    disabled
                    className={`${styles.info_box}`}
                  />
                </div>
              </div>
              <div className="col-12 d-flex mt-3">
                <div className={`${styles.field}`}>
                  <p className={`${styles.label}`}>Customer Name</p>
                  <input
                    type="text"
                    value={orderDetail.user.username}
                    disabled
                    className={`${styles.info_box}`}
                  />
                </div>
              </div>
            </div>

            <div className="row bg-white mx-2 rounded mt-5 py-4">
              <h4 className="fs-4">Address</h4>
              <div className="col-12 d-flex">
                <div className={`${styles.field2}`}>
                  <p className={`${styles.label}`}>Customer Address</p>
                  <input
                    type="text"
                    value={orderDetail.address}
                    disabled
                    className={`${styles.info_box}`}
                  />
                </div>
              </div>
            </div>

            <div className="row bg-white rounded mx-2 mt-5 py-4">
              <div className="">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.items.map((item) => {
                      return (
                        <tr key={item.product._id}>
                          <th scope="row">{++i}</th>
                          <td style={{ width: "100px", height: "100px" }}>
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{item.product.name}</td>
                          <td>{item.quantity}</td>
                          <td>₫ {item.product.price}</td>
                          <td>₫ {item.subTotalPrice}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="">
                <div
                  className={`small-row d-flex justify-content-end me-5 ${styles.total_price}`}
                >
                  <p className="me-2">Total: </p>
                  <p>₫ {orderDetail.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
