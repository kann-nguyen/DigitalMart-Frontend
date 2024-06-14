import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../../redux/slices/modalSlice";
import Select from "react-select";
const CustomerForm = ({ username, email, phonenumber }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    address: "",
  });
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    if (e.target.address !== "") {
      document.querySelector(".addr-alert").classList.add("hidden");
    }
  };
  const handleContinueCheckout = () => {
    localStorage.setItem("customer-info", JSON.stringify(info));
  };
  return (
    <div className="checkout-left-data">
      <h3 className="website-name">Digital Mart</h3>
      <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/basket" className="text-dark">
              Cart
            </Link>
          </li>
          &nbsp; /
          <li
            className="breadcrumb-item total-price active"
            aria-current="page"
          >
            Information
          </li>
          &nbsp; /
          <li
            className="breadcrumb-item total-price active"
            aria-current="page"
          >
            Shipping
          </li>
          &nbsp; /
          <li
            className="breadcrumb-item total-price active"
            aria-current="page"
          >
            Payment
          </li>
        </ol>
      </nav>
      <h4 className="title total">Contact Information</h4>
      <p className="user-details total fs-6">
        - Customer name: <span className="fw-bold">{username}</span>
      </p>
      <p className="user-details total">
        - Email: <span className="fw-bold">{email}</span>{" "}
      </p>
      <p className="user-details total">
        - Phone number: <span className="fw-bold">{phonenumber}</span>
      </p>
      <h4 className="mb-3">Shipping Address</h4>
      <form
        action=""
        className="d-flex flex-wrap justify-content-between gap-15"
      >
        <div className="w-100">
          <input
            type="text"
            placeholder="Address"
            className="form-control"
            name="address"
            value={info.address}
            onChange={handleChange}
          />
          <p className="addr-alert error hidden">The address cannot be empty</p>
        </div>
        {/* <div className="w-100">
          <input
            type="tel"
            placeholder="Phone number"
            className="form-control"
            name="phoneNumber"
            value={info.phoneNumber}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="w-100">
          <Select
            options={paymentOptions}
            placeholder="Choose one payment method"
            // name="paymentMethod"
            onChange={handleChange}
            isDisabled={true}
          />
        </div>
        <div className="w-100">
          <input
            type="tel"
            placeholder="Card Number"
            className="form-control"
            name="creditCart"
            value={info.cardNumber}
            onChange={handleChange}
            disabled
          />
        </div> */}
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/basket" className="text-dark mb-0">
              <IoMdArrowRoundBack className="me-2 fs-3" />
              Return to Cart
            </Link>
            <Link
              className="button"
              onClick={(e) => {
                e.preventDefault();
                if (info.address !== "") {
                  dispatch(openModal());
                  handleContinueCheckout();
                } else {
                  document
                    .querySelector(".addr-alert")
                    .classList.remove("hidden");
                }
                // console.log(info);
              }}
            >
              Continue to Checkout
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
