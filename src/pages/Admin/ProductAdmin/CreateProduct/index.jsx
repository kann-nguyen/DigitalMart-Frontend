import { useFormik } from 'formik';
import './style.scss'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../../../redux/apis/category-api';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import CustomInput from '../../../Auth/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { FcAddImage } from "react-icons/fc";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { createProduct } from '../../../../redux/apis/product-api';
import { setLoading } from '../../../../redux/slices/loadingSlice';

const CreateProduct = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory())
    }, []);
    const [fileList, setFileList] = useState([]);
    const [previews, setPreviews] = useState([])
    const [metadata, setMetadata] = useState({});
    const [metadataProps, setMetadataProps] = useState([]);
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
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/admin/inventory');
    }
    useEffect(() => {
        if (fileList.length === 0) {
            setPreviews([])
            return;
        }
        const fileListUrl = fileList.map(item => URL.createObjectURL(item));
        setPreviews(_ => fileListUrl);
        console.log(fileListUrl);
        return () => fileListUrl.map(url => URL.revokeObjectURL(url));
    }, [fileList])
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
        const newList = [...fileList, newFile];
        setFileList(newList);
        formik.setFieldValue('images', newList)
    }
    const handleClickAddBtn = () => {
        fileRef.current?.click();
    }
    const handleRemoveImage = (index) => {
        const newList = fileList.filter((_, i) => i !== index);
        setFileList([...newList]);
        formik.setFieldValue('images', newList);
    }
    const categories = useSelector((state) => state.categories.categories);
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            brand: '',
            category: '',
            metadata: {},
            images: [],
            stock: 0,
            threshold: 0
        },
        validationSchema: Yup.object({
            name: Yup.string().required().max(100).min(10),
            description: Yup.string().required(),
            price: Yup.number().min(1).required(),
            brand: Yup.string().required(),
            category: Yup.string().required(),
            metadata: Yup.object(),
            images: Yup.array().min(1).required(),
            stock: Yup.number().min(1),
            threshold: Yup.number().min(1),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            const formData = new FormData();
            formData.append('name', values.name)
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('brand', values.brand);
            formData.append('category', values.category);
            formData.append('stock', values.stock);
            formData.append('threshold', values.threshold);
            values.images.forEach((image) => formData.append('images', image))
            Object.entries(values.metadata).forEach(([key, value]) => {
                formData.append(`metadata[${key}]`, value);
            });
            dispatch(setLoading(true))
            dispatch(createProduct(formData))
                .unwrap()
                .then((result) => {
                    resetForm()
                    navigate('/admin/inventory');
                })
                .catch(err => {
                    toast.error(err.message);
                })
                .finally(() => dispatch(setLoading(false)))
        },
        validateOnChange: false,
        validateOnBlur: false
    });
    return (
        <div className='create-product-wrapper'>
            <div className='create-product-header'>
                <div>
                    <Link to='/admin/inventory'>Products</Link>
                    {'  >  New Product'}
                </div>
                <div className='create-product-btn'>
                    <div className='btn btn-outline-danger' onClick={handleCancel}>X Cancel</div>
                    <div className='btn btn-dark' onClick={formik.handleSubmit}>+ Add</div>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} className='container create-product-form'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='row bg-light product-form'>
                            <h5>General Infomation</h5>
                            <div className='product-form-item'>
                                <label htmlFor="name">Product Name</label>
                                <input type="text" id='name' name='name'
                                    onChange={formik.handleChange} value={formik.values.name}
                                    placeholder='Type product name here' />
                                {formik.errors.name && formik.touched.name && (
                                    <div className="error">{formik.errors.name}</div>
                                )}
                            </div>
                            <div className='product-form-item'>
                                <label htmlFor="brand">Product Brand</label>
                                <input type="text" id='brand' name='brand'
                                    onChange={formik.handleChange} value={formik.values.brand}
                                    placeholder='Type product brand here' />
                                {formik.errors.brand && formik.touched.brand && (
                                    <div className="error">{formik.errors.brand}</div>
                                )}
                            </div>
                            <div className='product-form-item'>
                                <label htmlFor="description">Description</label>
                                <textarea id='description' name='description'
                                    onChange={formik.handleChange} value={formik.values.description}
                                    placeholder='Type product description here ...' />
                                {formik.errors.description && formik.touched.description && (
                                    <div className="error">{formik.errors.description}</div>
                                )}
                            </div>
                        </div>
                        <div className='row bg-light product-form'>
                            <h5>Inventory</h5>
                            <div className='product-form-item-wrapper'>
                                <div className='product-form-item flex-grow-1'>
                                    <label htmlFor="stock">Stock</label>
                                    <input type="number" id='stock' name='stock' min={0}
                                        onChange={formik.handleChange} value={formik.values.stock} />
                                    {formik.errors.stock && formik.touched.stock && (
                                        <div className="error">{formik.errors.stock}</div>
                                    )}
                                </div>
                                <div className='product-form-item flex-grow-1'>
                                    <label htmlFor="threshold">Threshold</label>
                                    <input type="number" id='threshold' name='threshold' min={0}
                                        onChange={formik.handleChange} value={formik.values.threshold} />
                                    {formik.errors.threshold && formik.touched.threshold && (
                                        <div className="error">{formik.errors.threshold}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='row bg-light product-form'>
                            <h5>Images</h5>
                            <input type="file" multiple hidden onChange={onSelectFile} ref={fileRef} />
                            <div>
                                <div className="product-form-image">
                                    {fileList.length > 0
                                        ? (
                                            <div className='image-previews'>
                                                <div className='image-previews-wrapper'>
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
                                {formik.errors.images && formik.touched.images && (
                                    <div className="error">{formik.errors.images}</div>
                                )}
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
                        <div className='row bg-light product-form'>
                            <h5>Category</h5>
                            <div className='product-form-item'>
                                <label htmlFor="category">Select category</label>
                                <select name="category" id="category" onChange={formik.handleChange}
                                    value={formik.values.category}>
                                    <option value="">Select a category...</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                                {formik.errors.category && formik.touched.category && (
                                    <div className="error">{formik.errors.category}</div>
                                )}
                            </div>
                        </div>
                        <div className='row bg-light product-form'>
                            <h5>Price</h5>
                            <div className='product-form-item'>
                                <label htmlFor="price">Set price</label>
                                <input type="number" id='price' name='price' min={0}
                                    onChange={formik.handleChange} value={formik.values.price} />
                                {formik.errors.price && formik.touched.price && (
                                    <div className="error">{formik.errors.price}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct;