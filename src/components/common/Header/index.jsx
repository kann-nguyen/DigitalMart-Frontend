import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaHeart, FaUser, FaShoppingCart, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import "./styles.css";
import { useAuth } from "./../../hooks/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../redux/apis/category-api";
import useFetchData from "../../../components/hooks/useFetchData";
import { getAllProduct } from '../../../redux/apis/product-api';

export const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const isFetched = useFetchData(() => [dispatch(getAllCategory()), dispatch(getAllProduct())]);
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector(state => state.products.products)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  console.log(currentUser)
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const renderCategoryList = () => {
    return categories.map((item, index) => (
      <div
        key={index}
        className="dropdown-item"
        onClick={() => {
          navigate(`/product-search-page?category=${item._id}`)
          if (isDropdownOpen) setIsDropdownOpen(!isDropdownOpen)
        }}
        style={{ cursor: 'pointer' }}
      >
        {item.name}
      </div>
    ));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  useEffect(() => {
    setSearchQuery('')
    setSearchResults([])
  }, [location.pathname])
  const handleBlur = (event) => {
    if (
      !searchInputRef.current.contains(event.relatedTarget) &&
      !searchResultsRef.current.contains(event.relatedTarget)
    ) {
      setShowResults(false);
    }
  };
  const handleFocus = () => {
    setShowResults(true);
  };
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/product-search-page?query=${searchQuery.trim()}`)
      setSearchQuery('');
      setSearchResults([]);
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit()
    }
  }
  const handleClickSearchItem = (id) => {
    navigate(`/product-detail/${id}`)
    setSearchQuery('');
    setSearchResults([]);
  }
  return (
    <header className='header-wrapper'>
      <header className="header-top-strip">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-black mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-black">
                Hotline:{" "}
                <a className="text-black" href="tel:+91 213127316">
                  +91 213127316
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white" to={""}>
                  DigitalMart
                </Link>
              </h2>
            </div>
            <div className="col-2">
              <div className="dropdown">
                <button
                  className="btn btn-secondary 
                                    dropdown-toggle 
                                    bg-transparent 
                                    border-0 
                                    gap-15 me-5 d-flex 
                                    align-items-center"
                  type="button"
                  onClick={toggleDropdown}
                >
                  {isDropdownOpen ? <FaCaretUp className="dropdown-icon" /> : <FaCaretDown className="dropdown-icon" />}

                  <span className="me-5 d-inline-block">Shop Categories</span>
                </button>
                {isDropdownOpen && (
                  <ul className="dropdown-menu show">
                    {renderCategoryList()}
                  </ul>
                )}
              </div>
            </div>
            <div className="col-4 position-relative">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search product here..."
                  aria-label="Search product here..."
                  aria-describedby="basic-addon2"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyPress}
                  onFocus={handleFocus} onBlur={handleBlur} ref={searchInputRef}
                />
                <span className="input-group-text p-3" id="basic-addon2" onClick={handleSearchSubmit}>
                  <BsSearch className="fs-6" />
                </span>
              </div>
              {(showResults && searchResults.length > 0) && (
                <ul className="search-results position-absolute bg-white w-100 mt-1" ref={searchResultsRef}>
                  {searchResults.map((product, index) => (
                    <li key={index} className="search-result-item">
                      <Link to={`/product-detail/${product._id}`} className="text-dark text-truncate">
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    className="d-flex align-items-center text-white"
                    to={"/wishlist"}
                  >
                    <div className="icon mt-2">
                      <FaHeart className='fs-4' />
                    </div>
                    <p className="mb-0">
                      Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link className="d-flex align-items-center text-white" to={isAuthenticated ? (currentUser.role === "ADMIN" ? '/admin' : '/profile') : '/auth'}>
                    <div className="icon mt-2">
                      <FaUser className='fs-4' />
                    </div>
                    <p className='mb-0'>
                      {isAuthenticated ? (currentUser.role === 'ADMIN' ? 'Dashboard' : 'My Profile') : 'Login'} <br />
                      {isAuthenticated ? '' : 'My Account'}
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    className="d-flex align-items-center text-white"
                    to={"/basket"}
                  >
                    <div className="icon mt-2">
                      <FaShoppingCart className='fs-4' />
                    </div>
                    <div className="d-flex flex-column">
                      {/* <span className="badge bg-white text-dark">{0}</span> */}
                      <p className="mb-0">My Basket</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </header>
  );
};

export default Header;
