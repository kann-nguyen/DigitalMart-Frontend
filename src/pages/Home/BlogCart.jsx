import React from 'react'
import { Link } from 'react-router-dom'
const BlogCart = () => {
  return (
    
        <div className="blog-card">
            <div className="card-image">
                <img src="../images/blog-1.jpg" className='img-fluid' alt="" />
            </div>
            <div className="blog-content">
                <p className="date">25 April 2023</p>
                <h5 className="title"> Beautiful sunday morning every one</h5>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Link className='button'>Read More</Link>
            </div>
        </div>     
    
  )
}

export default BlogCart