import React from 'react'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import "./styles.css"
import BlogCart from './BlogCart';
import ProductCard from './ProductCard';
import ReactStars from "react-rating-stars-component";
import SpecialProducts from './SpecialProducts';
const Home = () => {
  return (
    <>
    <section className='home-wrapper-1 py-5'>
        <div className='container-xxl'>
            <div className='row'>
                <div className='col-6'>
                    <div className='main-banner position-relative p-3'>
                        <img src="../images/main-banner-1.jpg" alt="" className='img-fluid rounded-3'></img>
                        <div className="main-banner-content position-absolute">
                            <h4>SUPERCHARGED FOR PROS.</h4>
                            <h5>iPad S13+ Pro.</h5>
                            <p>From $999.00 or $41.62/mo</p>
                            <Link className='button'>BUY NOW</Link>
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <div className='small-banner position-relative p-3'>
                            <img src="../images/catbanner-01.jpg" alt="" className='img-fluid rounded-3'></img>
                            <div className="small-banner-content position-absolute">
                                <h4>BEST SALES.</h4>
                                <h5>iPad S13+ Pro.</h5>
                                <p>From $999.00 or $41.62/mo</p>
                                
                            </div>
                        </div>
                        <div className='small-banner position-relative p-3'>
                            <img src="../images/catbanner-02.jpg" alt="" className='img-fluid rounded-3'></img>
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVALS.</h4>
                                <h5>iPad Air.</h5>
                                <p>From $999.00 or $41.62/mo</p>
                                
                            </div>
                        </div>
                        <div className='small-banner position-relative p-3'>
                            <img src="../images/catbanner-03.jpg" alt="" className='img-fluid rounded-3'></img>
                            <div className="small-banner-content position-absolute">
                                <h4>BEST SALES.</h4>
                                <h5>iPad S13+ Pro.</h5>
                                <p>From $999.00 or $41.62/mo</p>
                                
                            </div>
                        </div>
                        <div className='small-banner position-relative p-3'>
                            <img src="../images/catbanner-04.jpg" alt="" className='img-fluid rounded-3'></img>
                            <div className="small-banner-content position-absolute">
                                <h4>NEW ARRIVALS.</h4>
                                <h5>iPad Air.</h5>
                                <p>From $999.00 or $41.62/mo</p>
                                
                            </div>
                        </div>
                    </div>
                </div>   
            </div> 
        </div>
    </section>
    <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className='services d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center gap-10'>
                            <img  src="../images/service.png" alt="services" />
                            <div>
                                <h6>Free Shipping</h6>
                                <p className='mb-0'>From all orders over $100</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img  src="../images/service-02.png" alt="services" />
                            <div>
                                <h6>Daily Surprise Offer</h6>
                                <p className='mb-0'>Save up to 25% off</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img  src="../images/service-03.png" alt="services" />
                            <div>
                                <h6>Support 24/7</h6>
                                <p className='mb-0'>Shop with an expert</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img  src="../images/service-04.png" alt="services" />
                            <div>
                                <h6>Affordable Prices</h6>
                                <p className='mb-0'>Get factory direct price</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img  src="../images/service-05.png" alt="services" />
                            <div>
                                <h6>Secure Payments</h6>
                                <p className='mb-0'>100% protected payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Cameras</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/camera.jpg" alt="" />
                        </div>
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Smart TV</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/tv.jpg" alt="" />
                        </div>
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Smart Watches</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/headphone.jpg" alt="" />
                        </div>
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Music&Gaming</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/camera.jpg" alt="" />
                        </div>
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Cameras</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/camera.jpg" alt="" />
                        </div>
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Smart TV</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/tv.jpg" alt="" />
                        </div>
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Smart Watches</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/headphone.jpg" alt="" />
                        </div>
                        <div className='d-flex align-items-center gap'>
                            <div>
                                <h6>Music&Gaming</h6>
                                <p>10 Items</p>
                            </div>
                            <img src="../images/camera.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className='section-heading'>Featured Collection</h3>
                </div>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    </section>
    <section className='famous-wrapper home-wrapper-2 py-5'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-3">
                    <div className="famous-card position-relative">
                        <img src="../images/famous-1.webp" alt="" className=' img-fluid'/>
                        <div className="famous-content position-absolute">
                            <h5>Big Screen</h5>
                            <h6>Smart Watch Series 7</h6>
                            <p>From $399 or 49.99/mo for 12 months</p>
                        </div>   
                    </div>
                </div>
                <div className="col-3">
                    <div className="famous-card position-relative">
                        <img src="../images/famous-2.jpg" alt="" className=' img-fluid'/>
                        <div className="famous-content position-absolute">
                            <h5 className=' text-dark'>StudioDisplay</h5>
                            <h6 className=' text-dark'>600 nlts of brightness</h6>
                            <p className=' text-dark'>27-Inch 5K Retina Display</p>
                        </div>   
                    </div>
                </div>
                <div className="col-3">
                    <div className="famous-card position-relative">
                        <img src="../images/famous-3.webp" alt="" className=' img-fluid'/>
                        <div className="famous-content position-absolute">
                            <h5 className=' text-dark'>SmartPhones</h5>
                            <h6 className=' text-dark'>Smartphone 13 Pro</h6>
                            <p className=' text-dark'>Now it's green.From $399 or 49.99/mo for 12 months</p>
                        </div>   
                    </div>
                </div>
                <div className="col-3">
                    <div className="famous-card position-relative">
                        <img src="../images/famous-4.jpg" alt="" className=' img-fluid'/>
                        <div className="famous-content position-absolute">
                            <h5 className=' text-dark'>home speakers</h5>
                            <h6 className=' text-dark'>Room-filling Sound</h6>
                            <p className=' text-dark'>From $399 or 49.99/mo for 12 months</p>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className='special-wrapper py-5 home-wrapper-2'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">Special Products</h3>
                </div>
            </div>
            <div className='row'>
                <SpecialProducts/>
                <SpecialProducts/>
                <SpecialProducts/>
            </div>
        </div>
    </section>
    <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className='section-heading'>Our Popular Product</h3>
                </div>
            </div>
            <div className="row">
               
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    </section>
    <section className='marque-wrapper py-5'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="marquee-inner-wrapper card-wrapper">
                        <Marquee>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-01.png" alt="" />
                            </div>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-02.png" alt="" />
                            </div>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-03.png" alt="" />
                            </div>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-04.png" alt="" />
                            </div>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-05.png" alt="" />
                            </div>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-06.png" alt="" />
                            </div>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-07.png" alt="" />
                            </div>
                            <div className='mx-4 w-25'>
                                <img src="../images/brand-08.png" alt="" />
                            </div>
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className='section-heading'>Our Latest Blogs</h3>
                </div>
                <div className="row">
                    <div className="col-3">
                        <BlogCart/>
                    </div>
                    <div className="col-3">
                        <BlogCart/>
                    </div>
                    <div className="col-3">
                        <BlogCart/>
                    </div>
                    <div className="col-3">
                        <BlogCart/>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Home