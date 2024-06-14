import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../ViewProduct/CommonStyling.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useFetchData from '../../../../components/hooks/useFetchData';
import { getAllCategory } from '../../../../redux/apis/category-api';
import { getProductDetail, updateProduct } from '../../../../redux/apis/product-api';
import { MdOutlineDelete } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { setLoading } from '../../../../redux/slices/loadingSlice';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const { product, inventory } = useSelector(state => {
    return {
      product: state.products.productDetail.product,
      inventory: state.products.productDetail.inventory
    }
  });
  const isFetched = useFetchData(() => [dispatch(getAllCategory()), dispatch(getProductDetail(productId))])
  const categories = useSelector(state => state.categories.categories)
  const handleCancel = () => {
    navigate(`/admin/view-product/${productId}`);
  }
  // IMAGES
  const [newImages, setNewImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([])
  const [previews, setPreviews] = useState([])
  useEffect(() => {
    if (newImages.length === 0) {
      setPreviews([])
      return;
    }
    const fileListUrl = newImages.map(item => URL.createObjectURL(item));
    setPreviews(_ => fileListUrl);
    // console.log(fileListUrl);
    return () => fileListUrl.map(url => URL.revokeObjectURL(url));
  }, [newImages])
  const fileRef = useRef(null);
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    const newFile = e.target.files && e.target.files[0];
    const type = newFile.type.split('/')[0];
    if (type !== "image") {
      toast.error("Please upload Image type")
      return;
    }
    const newList = [...newImages, newFile];
    setNewImages(newList);
    // formik.setFieldValue('images', newList)
  }
  const handleClickAddBtn = () => {
    fileRef.current?.click();
  }
  const markandUnmarkAsDelete = (url) => {
    const isMarked = deleteImages.find(i => i === url);
    if (isMarked) {
      const newDeleteImages = deleteImages.filter(i => i !== url);
      setDeleteImages(newDeleteImages);
    } else {
      setDeleteImages([...deleteImages, url]);
    }
  }
  const handleRemoveImage = (index) => {
    const newList = newImages.filter((_, i) => i !== index);
    setNewImages([...newList]);
  }
  // METADATA
  const [metadataProps, setMetadataProps] = useState([]);
  useEffect(() => {
    if (product && product.metadata) {
      const metadataArray = Object.entries(product.metadata).map(([key, value]) => ({ key, value }));
      setMetadataProps(metadataArray);
    }
  }, [isFetched]);
  const handleAddProp = () => {
    setMetadataProps([...metadataProps, { key: '', value: '' }]);
  };
  const handleMetadataPropChange = (index, event) => {
    const { name, value } = event.target;
    const newMetadataProps = [...metadataProps];
    newMetadataProps[index][name] = value;
    setMetadataProps(newMetadataProps);
    const newMetadata = {};
    newMetadataProps.forEach(input => {
      if (input.key) {
        newMetadata[input.key] = input.value;
      }
    });
    formik.setFieldValue('metadata', newMetadata);
  };
  const handleRemoveProp = (index) => {
    const newMetadataProps = metadataProps.filter((_, i) => i !== index);
    setMetadataProps(newMetadataProps);
    const newMetadata = {};
    newMetadataProps.forEach(input => {
      if (input.key) {
        newMetadata[input.key] = input.value;
      }
    });
    formik.setFieldValue('metadata', newMetadata);
  };
  const formik = useFormik({
    initialValues: {
      name: product ? product.name : '',
      description: product ? product.description : '',
      price: product ? product.price : '',
      brand: product ? product.brand : '',
      category: product ? product.category : '',
      metadata: product ? product.metadata : {},
      // images: product ? product.images : [],
      stock: inventory ? inventory.stock : 0,
      threshold: inventory ? inventory.threshold : 0,
      isPublished: product ? product.isPublished : false
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required().max(100).min(10),
      description: Yup.string().required(),
      price: Yup.number().min(1).required(),
      brand: Yup.string().required(),
      category: Yup.string().required(),
      metadata: Yup.object(),
      // images: Yup.array().min(1).required(),
      stock: Yup.number().min(1),
      threshold: Yup.number().min(1),
      isPublished: Yup.boolean()
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Submitting")
      console.log(values);
      const formData = new FormData();
      if (values.name !== formik.initialValues.name) formData.append(`data[name]`, values.name)
      if (values.brand !== formik.initialValues.brand) formData.append('data[brand]', values.brand)
      if (values.description !== formik.initialValues.description) formData.append(`data[description]`, values.description)
      if (values.price !== formik.initialValues.price) formData.append(`data[price]`, values.price)
      if (values.threshold !== formik.initialValues.threshold) formData.append(`data[threshold]`, values.threshold)
      if (values.stock !== formik.initialValues.stock) formData.append(`data[stock]`, values.stock)
      if (values.isPublished !== formik.initialValues.isPublished) formData.append(`data[isPublished]`, values.isPublished)
      if (values.category !== formik.initialValues.category) formData.append(`data[category]`, values.category)
      newImages.forEach((image) => formData.append('newImages', image))
      formData.append('deletedImages', '');
      formData.append('deletedImages', '');
      deleteImages.forEach((image) => formData.append('deletedImages', image))
      if (JSON.stringify(values.metadata) !== JSON.stringify(formik.initialValues.metadata)) {
        Object.entries(values.metadata).forEach(([key, value]) => {
          formData.append(`data[metadata][${key}]`, value)
        });
      }
      dispatch(setLoading(true))
      dispatch(updateProduct({
        data: formData,
        id: productId
      }))
        .unwrap()
        .then((result) => {
          toast.success("Success")
          navigate(`/admin/view-product/${productId}`);
        })
        .catch(err => {
          console.log(err);
          toast.error("error");
        })
        .finally(() => dispatch(setLoading(false)))
    },
    validateOnChange: false,
    validateOnBlur: false
  });
  const btnFormRef = useRef(null);
  // console.log(formik.initialValues);
  // console.log(formik.handleSubmit);
  return (
    <div className='common-product-wrapper'>
      <div className="common-product-header">
        <div>
          <Link to='/admin/inventory'>Products</Link>
          {'  >  '}
          <Link to={`/admin/view-product/${productId}`}>{productId}</Link>
          {'  >   Edit '}
        </div>
        <div className='common-product-btn'>
          <div className='btn btn-outline-danger' onClick={handleCancel}>X Cancel</div>
          <div className='btn btn-dark' onClick={() => {
            btnFormRef.current.click()
          }}>Save</div>
        </div>
      </div>
      {isFetched && (
        <form onSubmit={formik.handleSubmit} className='container common-product-form'>
          <div className='row'>
            <div className='col-8'>
              <div className='row bg-light common-form  '>
                <h5>General Infomation</h5>
                <div className='common-form-item'>
                  <label htmlFor="name">Product Name</label>
                  <input type="text" id='name' name='name'
                    onChange={formik.handleChange} value={formik.values.name}
                    placeholder='Type product name here' />
                  {formik.errors.name && formik.touched.name && (
                    <div className="error">{formik.errors.name}</div>
                  )}
                </div>
                <div className='common-form-item'>
                  <label htmlFor="brand">Product Brand</label>
                  <input type="text" id='brand' name='brand'
                    onChange={formik.handleChange} value={formik.values.brand}
                    placeholder='Type product brand here' />
                  {formik.errors.brand && formik.touched.brand && (
                    <div className="error">{formik.errors.brand}</div>
                  )}
                </div>
                <div className='common-form-item'>
                  <label htmlFor="description">Description</label>
                  <textarea id='description' name='description'
                    onChange={formik.handleChange} value={formik.values.description}
                    placeholder='Type product description here ...' />
                  {formik.errors.description && formik.touched.description && (
                    <div className="error">{formik.errors.description}</div>
                  )}
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Inventory</h5>
                <div className='common-form-item-wrapper'>
                  <div className='common-form-item flex-grow-1'>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" id='stock' name='stock' min={0}
                      onChange={formik.handleChange} value={formik.values.stock} />
                    {formik.errors.stock && formik.touched.stock && (
                      <div className="error">{formik.errors.stock}</div>
                    )}
                  </div>
                  <div className='common-form-item flex-grow-1'>
                    <label htmlFor="threshold">Threshold</label>
                    <input type="number" id='threshold' name='threshold' min={0}
                      onChange={formik.handleChange} value={formik.values.threshold} />
                    {formik.errors.threshold && formik.touched.threshold && (
                      <div className="error">{formik.errors.threshold}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Images</h5>
                <input type="file" multiple hidden onChange={onSelectFile} ref={fileRef} />
                <div className="common-form-image">
                  {newImages.length > 0 || product.images.length > 0
                    ? (
                      <div className='image-previews'>
                        <div className='image-previews-wrapper'>
                          {product.images.map((image, index) => {
                            return <div className='image-previews-item'>
                              <img src={image} />
                              <div className='delete-checkbox' onClick={() => markandUnmarkAsDelete(image)}>
                                {deleteImages.find(i => i === image)
                                  ? <RiCheckboxIndeterminateFill style={{ position: 'absolute', color: 'red' }} />
                                  : <MdOutlineCheckBoxOutlineBlank style={{ position: 'absolute' }} />
                                }
                              </div>
                            </div>
                          })}
                          {previews.map((image, index) => {
                            return <div key={index} className='image-previews-item'>
                              <img src={image} />
                              <div className='cls-btn' onClick={() => handleRemoveImage(index)}><IoMdCloseCircle style={{ position: 'absolute' }} /></div>
                            </div>
                          })}
                        </div>
                      </div>
                    )
                    : <div onClick={handleClickAddBtn} style={{ cursor: 'pointer' }}><FcAddImage size={80} /></div>}
                  <span>Click to add image</span>
                  <div className='add-image' onClick={handleClickAddBtn}>Add Image</div>
                </div>
              </div>
              <div className='row bg-light product-form'>
                <h5>Metadata</h5>
                <div className='product-form-metadata'>
                  {metadataProps.length > 0 && (
                    <div>
                      <div className='product-form-item-wrapper'>
                        <div className='flex-grow-1'><h6>Key</h6></div>
                        <div className='flex-grow-1'><h6>Value</h6></div>
                      </div>
                      {metadataProps.map((prop, index) => {
                        return <div key={index} className='product-form-item-wrapper'>
                          <div className='product-form-item flex-grow-1'>
                            <input type="text" name='key' placeholder='Key'
                              value={prop.key} onChange={e => handleMetadataPropChange(index, e)} />
                          </div>
                          <div className='product-form-item flex-grow-1'>
                            <input type="text" name='value' placeholder='Value'
                              value={prop.value} onChange={e => handleMetadataPropChange(index, e)} />
                          </div>
                          <div className='remove-metadata' onClick={() => handleRemoveProp(index)}><MdOutlineDelete size={40} /></div>
                        </div>
                      })}
                    </div>
                  )}
                  <div className='add-metadata' onClick={handleAddProp}>+ Add Metadata</div>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='row bg-light common-form'>
                <h5>Category</h5>
                <div className='common-form-item'>
                  <label htmlFor="category">Select category</label>
                  <select name="category" id="category" onChange={formik.handleChange}
                    value={formik.values.category}>
                    <option value="" disabled>Select a category...</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                  </select>
                  {formik.errors.category && formik.touched.category && (
                    <div className="error">{formik.errors.category}</div>
                  )}
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Price</h5>
                <div className='common-form-item'>
                  <label htmlFor="price">Set price</label>
                  <input type="number" id='price' name='price' min={0}
                    onChange={formik.handleChange} value={formik.values.price} />
                  {formik.errors.price && formik.touched.price && (
                    <div className="error">{formik.errors.price}</div>
                  )}
                </div>
              </div>
              <div className='row bg-light common-form'>
                <h5>Status</h5>
                <div className='common-form-item'>
                  <label htmlFor="isPublished">Status</label>
                  <select name="isPublished" id="isPublished" onChange={formik.handleChange}
                    value={formik.values.isPublished}
                  >
                    <option value={false}>Inactive</option>
                    <option value={true}>Active</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button type='submit' ref={btnFormRef} hidden></button>
        </form>
      )}
    </div>
  )
}

export default EditProduct