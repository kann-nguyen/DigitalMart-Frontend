import React from "react";

const PaymentItem = ({ product, quantity }) => {
  const { id, name, images, price } = product;
  return (
    <div className="d-flex align-items-center gap-10 mb-2">
      <div className="w-75 d-flex gap-10">
        <div className="w-25 position-relative">
          <span
            style={{ top: "-10px", right: "2px" }}
            className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
          >
            {quantity}
          </span>
          <img className="img-fluid" src={images[0]} alt={name} style={{"width": "75px", "height": "75px"}}/>
        </div>
        <div className="align-content-center">
          <h5 className="total-price">{name}</h5>
        </div>
      </div>
      <div className="flex-grow-1">
        <h5 className="total">₫ {(quantity * price).toLocaleString('vi-VN')}</h5>
      </div>
    </div>
  );
};

export default PaymentItem;
