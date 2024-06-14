import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../components/common/BreadCrumb'
import Meta from './Meta';
import "./style.css";
import ReactStars from "react-rating-stars-component";
import ProductCard from '../Home/ProductCard';

import Card from './Card';
import Skeleton from '../../components/common/Skeleton/Skeleton';
const OurStore = () => {
  const [grid,setGrid]=useState(4);
  const [loading,setLoading]=useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
  
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className=" ps-0">
                    <li>Watch</li>
                    <li>TV</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      {" "}
                      In stock(1){" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                      checked
                    />
                    <label className="form-check-label" htmlFor="">
                      {" "}
                      Out of stock(0){" "}
                    </label>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="floatingInput"
                        id="formId1"
                        placeholder="From"
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="floatingInput"
                        id="formId1"
                        placeholder="To"
                      />
                      <label htmlFor="floatingInput">To</label>
                    </div>
                  </div>
                  <h5 className="sub-title">Colors</h5>
                  <div className="d-flex flex-wrap">
                    <ul className="colors ps-0">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        {" "}
                        S (2){" "}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="color-2"
                      />
                      <label className="form-check-label" htmlFor="color-2">
                        {" "}
                        M (2){" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tag d-flex flex-wrap align-items-center gap-10">
                    <span className=" badge bg-light text-secondary rounded-3 py-2 px-3">
                      Headphone
                    </span>
                    <span className=" badge bg-light text-secondary rounded-3 py-2 px-3">
                      Laptop
                    </span>
                    <span className=" badge bg-light text-secondary rounded-3 py-2 px-3">
                      Mobile
                    </span>
                    <span className=" badge bg-light text-secondary rounded-3 py-2 px-3">
                      Wire
                    </span>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div>
                {loading ? <Skeleton /> : <Card />}
                {loading ? <Skeleton /> : <Card />}
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort by:
                    </p>
                    <select name="" className="form-control form-select" id="">
                      <option value="manual">Featured</option>
                      <option value="best-selling" selected="selected">
                        Best Selling
                      </option>
                      <option value="price-ascending">Price,low to high</option>
                      <option value="price-descending">
                        Price,high to low
                      </option>
                      <option value="created-ascending">Date,old to new</option>
                      <option value="created-descending">
                        Date,new to old
                      </option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproduct mb-0">21 Products</p>
                    <div className="d-flex align-items-center gap-10">
                      <img
                        src="../images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(3);
                        }}
                      />
                      <img
                        src="../images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(4);
                        }}
                      />
                      <img
                        src="../images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(6);
                        }}
                      />
                      <img
                        src="../images/gr.svg"
                        className="d-block img-fluid"
                        alt="grid"
                        onClick={() => {
                          setGrid(12);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  {loading ? <Skeleton grid={grid} /> : <ProductCard grid={grid} />}
                  {loading ? <Skeleton grid={grid}/> : <ProductCard grid={grid} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurStore