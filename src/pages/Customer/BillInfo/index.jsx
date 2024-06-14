import React from "react";
import BreadCrumb from "../../../components/common/BreadCrumb";
import Meta from "../../Our Store/Meta";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../../../components/hooks/useFetchData";
import { getOrderById } from "../../../redux/apis/order-api";
import { formatDate } from "../../../redux/config";
const BillInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const isFetched = useFetchData(() => [dispatch(getOrderById(id))]);
  const orderDetail = useSelector((state) => state.orders.orderDetail);
  console.log(orderDetail);
  const { user, items, totalPrice, createdAt, address } = orderDetail;
  let i = 1;
  return (
    <>
      {isFetched && (
        <div>
          <BreadCrumb title="Bill Information" />
          <Meta title="Bill Information | Th4nh's" />
          <div className="bill-wrapper home-wrapper-2 py-5">
            <div className="container-xxl">
              <div className={`row ${styles.customer_bill_layout}`}>
                <div className={`col-12 py-2 mt-0 ${styles.customer_bill}`}>
                  <h4 className="text-capitalize fs-3 text-center mb-3">
                    purchase details
                  </h4>
                  <div className="d-flex justify-content-between align-items-baseline fs-6">
                    <div className="left">
                      <div className="small-row d-flex justify-content-start py-0">
                        <p className="me-2">Customer: </p>
                        <p className="">{user.username}</p>
                      </div>
                      <div className="small-row d-flex justify-content-start py-0">
                        <p className="me-2">Address: </p>
                        <p className="">{address}</p>
                      </div>
                    </div>
                    <div className="right">
                      <div className="small-row d-flex justify-content-end py-0">
                        <p className="me-2">Date: </p>
                        <p className="">{formatDate(createdAt)}</p>
                      </div>
                    </div>
                  </div>
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
                        {items.map((item) => {
                          return (
                            <tr key={item.product.id}>
                              <th scope="row">{i++}</th>
                              <td>
                                <div style={{ height: "50px", width: "50px" }}>
                                  <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              </td>
                              <td>{item.product.name}</td>
                              <td>{item.quantity}</td>
                              <td>
                                ₫ {item.product.price.toLocaleString("vi-VN")}
                              </td>
                              <td>
                                ₫{" "}
                                {(
                                  item.product.price * item.quantity
                                ).toLocaleString("vi-VN")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="">
                    <div className="small-row d-flex justify-content-end me-5">
                      <p className="me-2">Total: </p>
                      <p>₫ {totalPrice.toLocaleString("vi-VN")}</p>
                    </div>
                  </div>

                  <h5>Thank you for your shopping. </h5>
                  <small className="">Contact to us: xxx-xxx-xxx</small>
                </div>
                <div className="col-12 d-flex justify-content-start mt-4">
                  <Link to="/" className="button">
                    Continue to Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillInfo;
