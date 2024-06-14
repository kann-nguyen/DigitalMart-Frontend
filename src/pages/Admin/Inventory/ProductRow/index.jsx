import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom'; // Updated import
import useFetchData from '../../../../components/hooks/useFetchData';
import { useDispatch } from 'react-redux';
import { getInventoryOfProduct } from '../../../../redux/apis/inventory-api';

const ProductRow = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inventory, setInventory] = useState({
    quantity: null,
    threshold: null
  });
  useEffect(() => {
    dispatch(getInventoryOfProduct(product._id)).unwrap()
      .then(result => {
        setInventory({
          quantity: result.stock,
          threshold: result.threshold
        })
      })
  }, [])
  const handleViewProductClick = () => {
    navigate(`/admin/view-product/${product._id}`); // Updated method
  };
  const handleEidtProductClick = (productId) => {
    navigate(`/admin/edit-product/${product._id}`); // Updated method
  };
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>{inventory.quantity}</td>
      <td>{inventory.threshold}</td>
      <td>{product.isPublished ? <span className='text-success p-1 bg-success bg-opacity-50 rounded-pill'>Active</span> : <span className='text-danger p-1 bg-danger bg-opacity-50 rounded-pill'>Inactive</span>}</td>
      <td>
        <button className="btn btn-sm " onClick={handleEidtProductClick}><i className="fas fa-edit"></i></button>
        <button className="btn btn-sm " onClick={handleViewProductClick} ><i className="fas fa-eye"></i></button>
      </td>
    </tr>
  );
};

export default ProductRow;
