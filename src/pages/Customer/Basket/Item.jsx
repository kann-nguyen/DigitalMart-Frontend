import React, { useEffect, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItem,
  decreaseItem,
  removeItem,
} from "../../../redux/slices/basketSlice";

import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { updateBasket } from "../../../redux/apis/basket-api";

const Item = ({ product, quantity }) => {
  const dispatch = useDispatch();
  const { id, name, description, images, brand, category, metadata, price } =
    product;
  return (
    <div className="cart-data d-flex justify-content-between align-items-center mb-2">
      <div className="cart-col-1 d-flex align-items-center gap-15">
        <div className="w-25">
          <img src={images[0]} className="img-fluid" alt={name} />
        </div>
        <div className="w-75">
          <h5 className="title mb-0">{name}</h5>
          <p className="mb-0">{brand}</p>
          <p className="mb-0 text-truncate">{description}</p>
        </div>
      </div>
      <div className="cart-col-2">
        <h5 className="price">₫ {price.toLocaleString('vi-VN')}</h5>
      </div>
      <div className="cart-col-3 d-flex align-items-center gap-15">
        <div className="d-flex align-items-center gap-10">
          <button
            onClick={() => {
              // if (quantity === 1) {
              //   dispatch(removeItem(id));
              //   return;
              // }
              // dispatch(decreaseItem(id));
              dispatch(
                updateBasket({
                  product: product,
                  incrementBy: -1,
                })
              );
            }}
          >
            <FaChevronCircleLeft style={{ fontSize: "1.4rem" }} />
          </button>
          <p className="mb-0 fs-5">{quantity}</p>
          <button
            onClick={() => {
              dispatch(
                updateBasket({
                  product: product,
                  incrementBy: 1,
                })
              );
            }}
          >
            <FaChevronCircleRight style={{ fontSize: "1.4rem" }} />
          </button>
        </div>
        <div>
          <RiDeleteBinFill
            className="fs-3 text-danger"
            onClick={() => {
              dispatch(
                updateBasket({
                  product: product,
                  incrementBy: -quantity,
                })
              );
            }}
          />
        </div>
      </div>
      <div className="cart-col-4">
        <h5 className="price">₫ {(price * quantity).toLocaleString('vi-VN')}</h5>
      </div>
    </div>
  );
};

export default Item;
