import { useEffect, useState } from 'react';
import './ProductSearchPage.scss'
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from '../../../components/hooks/useFetchData';
import { getAllProduct } from '../../../redux/apis/product-api';
import CardProduct from '../CardProduct';
import { useLocation } from 'react-router-dom';
import { Range } from 'react-range';
import { Slider, Box, TextField } from '@mui/material';


const ProductSearchPage = () => {
    // const [timeOrder, setTimeOrder] = useState(true);
    // const [priceOrder, setPriceOrder] = useState(true);
    const [order, setOrder] = useState(0);
    const dispatch = useDispatch();
    const isFetched = useFetchData(() => [dispatch(getAllProduct())]);
    const products = useSelector(state => state.products.products);
    const { totalPages, page, hasPrevPage, hasNextPage } = useSelector(state => state.paginates)
    // console.log(products);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('category');
    const searchQuery = queryParams.get('query');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000000])
    useEffect(() => {
        let filtered = products;
        if (categoryId) {
            filtered = filtered.filter(product => product.category === categoryId);
        }
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        // Apply price range filter
        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        setFilteredProducts(filtered);
    }, [location.search, priceRange])
    const renderResultList = () => {
        let sortedProduct = [...filteredProducts];
        sortedProduct.sort((a, b) => {
            const difDate = new Date(b.createdAt) - new Date(a.createdAt);
            const difPrice = b.price - a.price
            if(order === 0) {
                return difDate
            }else if (order === 1) return -1 * difDate
            else if(order === 2) return -1 * difPrice;
            else return difPrice;
        });
        // sortedProduct.sort((a, b) => (priceOrder ? -1 : 1) * (b.price - a.price))
        return sortedProduct.map((item, index) => (
            <CardProduct product={item} height={'400px'} width={'230px'} />
        ))
    }
    const handlePrev = () => {
        dispatch(getAllProduct(page - 1));
    }
    const handleNext = () => {
        dispatch(getAllProduct(page + 1));
    }
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-3">
                    <div className="bg-light filter" style={{ height: 'fit-content' }}>
                        <div className='filter-items'>
                            <p>Sắp xếp theo</p>
                            <div className='filter-items-item'>
                                <p className={'filter-items-item-text ' + (order === 0 ? 'filter-active' : '')} onClick={() => setOrder(0)}>Mới nhất</p>
                                <p className={'filter-items-item-text ' + (order === 1 ? 'filter-active' : '')} onClick={() => setOrder(1)}>Cũ nhất</p>
                            </div>
                            <div className='filter-items-item'>
                                <p className={'filter-items-item-text ' + (order === 2 ? 'filter-active' : '')} onClick={() => setOrder(2)}>Giá tăng dần</p>
                                <p className={'filter-items-item-text ' + (order === 3 ? 'filter-active' : '')} onClick={() => setOrder(3)}>Giá giảm dần</p>
                            </div>
                        </div>
                        <div className='filter-items'>
                            Khoảng giá
                            <Box sx={{ width: 280 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <TextField
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(event) => handlePriceInputChange(event, 0)}
                                        InputProps={{
                                            inputProps: { min: 0, max: priceRange[1] }
                                        }}
                                    />
                                    <TextField
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(event) => handlePriceInputChange(event, 1)}
                                        InputProps={{
                                            inputProps: { min: priceRange[0], max: 100000000 }
                                        }}
                                    />
                                </Box>
                                <Slider
                                    value={priceRange}
                                    onChange={(event, newValue) => setPriceRange(newValue)}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={100000000}
                                    sx={{
                                        '& .MuiSlider-thumb': {
                                            bgcolor: 'primary.main',
                                        },
                                        '& .MuiSlider-track': {
                                            bgcolor: 'primary.main',
                                        },
                                        '& .MuiSlider-rail': {
                                            bgcolor: 'grey.400',
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                    </div>
                </div>
                <div className="col-9" style={{ minHeight: '900px' , overflowY: 'auto'}}>
                    <div className="bg-light p-2 d-flex flex-column justify-content-between h-100">
                        <div className='result-list'>
                            {isFetched && renderResultList()}
                        </div>
                        {/* <div className='result-pagination'>
                            <p onClick={handlePrev} className={'paginate-btn ' + (!hasPrevPage ? 'text-secondary disabled' : 'text-info')}>{'< Prev'}</p>
                            <p>{page} / {totalPages}</p>
                            <p onClick={handleNext} className={'paginate-btn ' + (!hasNextPage ? 'text-secondary disabled' : 'text-info')}>{'Next >'}</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductSearchPage;