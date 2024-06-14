import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetchData from '../../../../components/hooks/useFetchData';
import { useDispatch, useSelector } from 'react-redux';
import './CommonStyling.scss'
import { getProductDetail } from '../../../../redux/apis/product-api';
import { CiEdit } from "react-icons/ci";
import { getAllCategory } from '../../../../redux/apis/category-api';

const ViewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const isFetched = useFetchData(() => [dispatch(getAllCategory()), dispatch(getProductDetail(productId))]);
  const { product, inventory } = useSelector(state => {
    return {
      product: state.products.productDetail.product,
      inventory: state.products.productDetail.inventory
    }
  });
  const categories = useSelector(state => state.categories.categories)
  const onEditClick = () => navigate(`/admin/edit-product/${productId}`)
  return (
    <div className='common-product-wrapper'>
      <div className='common-product-header'>
        <div>
          <Link to='/admin/inventory'>Products</Link>
          {`  >  ${productId}`}
        </div>
        <div className='common-product-btn'>
          <div className='btn btn-dark' onClick={onEditClick}>
            <CiEdit size={20} style={{ marginRight: '10px' }} />
            <span>Edit</span>
          </div>
        </div>
      </div>
      {isFetched && (
        <div className='container common-product-form'>
          <div className="row">
            <div className='col-8'>
              <div className="row bg-light common-form">
                <h5>General Infomation</h5>
                <div className='common-form-item'>
                  <label htmlFor="name">Product Name</label>
                  <input type="text" value={product.name} disabled />
                </div>
                <div className='common-form-item'>
                  <label htmlFor="brand">Product Brand</label>
                  <input type="text" value={product.brand} disabled />
                </div>
                <div className='common-form-item'>
                  <label htmlFor="description">Description</label>
                  <textarea id='description' value={product.description} disabled />
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Inventory</h5>
                <div className='common-form-item-wrapper'>
                  <div className='common-form-item flex-grow-1'>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" id='stock' value={inventory.stock} disabled />
                  </div>
                  <div className='common-form-item flex-grow-1'>
                    <label htmlFor="threshold">Threshold</label>
                    <input type="text" id='threshold' value={inventory.threshold} disabled />
                  </div>
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Images</h5>
                <div>
                  <div className="common-form-image justify-content-center">
                    {product.images.length > 0
                      ? (
                        <div className='image-previews'>
                          <div className='image-previews-wrapper'>
                            {product.images.map((image, index) => {
                              return <div key={index} className='image-previews-item'>
                                <img src={image} />
                                {/* <div className='cls-btn' onClick={() => handleRemoveImage(index)}><IoMdCloseCircle style={{ position: 'absolute' }} /></div> */}
                              </div>
                            })}
                          </div>
                        </div>
                      )
                      : <div>Empty</div>}
                  </div>
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Metadata</h5>
                <div className='common-form-metadata'>
                  {Object.keys(product.metadata).length > 0 && (
                    <div>
                      <div className='product-form-item-wrapper'>
                        <div className='flex-grow-1'><h6>Key</h6></div>
                        <div className='flex-grow-1'><h6>Value</h6></div>
                      </div>
                      {Object.entries(product.metadata).map(([key, value], index) => {
                        return <div key={index} className='common-form-item-wrapper'>
                          <div className='common-form-item flex-grow-1'>
                            <input type="text" value={key} disabled />
                          </div>
                          <div className='common-form-item flex-grow-1'>
                            <input type="text" value={value} disabled />
                          </div>
                        </div>
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='row bg-light common-form'>
                <h5>Category</h5>
                <div className='common-form-item'>
                  <label htmlFor="category">Select category</label>
                  <input type="text" value={categories.find(category => category._id === product.category).name} disabled />
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Price</h5>
                <div className='common-form-item'>
                  <label htmlFor="price">Set price</label>
                  <input type="text" id='price' value={product.price} disabled />
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Status</h5>
                <div className='common-form-item'>
                  <label htmlFor="status">Status</label>
                  <input type="text" id='status' value={product.isPublished ? "Active" : "Inactive"} disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewProduct