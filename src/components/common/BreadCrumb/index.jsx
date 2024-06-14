import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const BreadCrumb = (props) => {
  return (
    <div className="breadcrumb py-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <p className="text-start">
              <Link to="/" className="text-dark">
                Home &nbsp;
              </Link>
              / {props.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
