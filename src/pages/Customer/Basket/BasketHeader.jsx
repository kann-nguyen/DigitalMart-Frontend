import React, { memo } from "react";

const BasketHeader = () => {
  return (
    <div className="cart-header d-flex justify-content-between align-items-center">
      <h4 className="cart-col-1">Product</h4>
      <h4 className="cart-col-2">Price</h4>
      <h4 className="cart-col-3">Quantity</h4>
      <h4 className="cart-col-4">Item's Total Cost</h4>
    </div>
  );
};

export default memo(BasketHeader);
