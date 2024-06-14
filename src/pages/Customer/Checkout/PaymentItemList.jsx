import React from "react";
import PaymentItem from "./PaymentItem";
import { useSelector } from "react-redux";
const PaymentItemList = () => {
  // new code
  const paymentList = useSelector(state => state.baskets.selectedItems);
  const getTotalPrice = () => {
    const totalPrice = paymentList.reduce((value, item) => {
      return value + item.product.price * item.quantity;
    }, 0);
    return totalPrice;
  };
  //
  // const paymentList = JSON.parse(localStorage.getItem("payment-list"));
  // const subtotal = JSON.parse(localStorage.getItem("totalPrice"));
  return (
    <>
      <div
        className="border-bottom py-4 overflow-auto"
        style={{ maxHeight: "255px" }}
      >
        {paymentList?.map((item) => {
          return <PaymentItem key={item.product.id} {...item} />;
        })}
      </div>
      <div className="border-bottom py-4">
        {/* <div className="d-flex justify-content-between align-items-center">
          <p className="total">Subtotal</p>
          <p className="total-price">₫ {subtotal}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="total mb-0">Shipping Fee</p>
          <p className="total-price mb-0">₫ 15000</p>
        </div> */}
      </div>
      <div className="d-flex justify-content-between align-items-center border-bottom py-4">
        <h4 className="total">Total Payment</h4>
        <h5 className="total-price">₫ {(getTotalPrice().toLocaleString('vi-VN'))}</h5>
      </div>
    </>
  );
};
 
export default PaymentItemList;