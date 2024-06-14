import React ,{ useState }from 'react'
import "./style.css";

const ThumbNail = ({images, onThumbnailClick}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    const handleThumbnailClick = (index) => {
      setCurrentIndex(index);
      if (onThumbnailClick) {
        onThumbnailClick(index);
      }
    };
  
    return (
      <div className="thumbnail-slider">
        <div className="arrow" onClick={prevSlide}>
          &#10094;
        </div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={image} alt={`Thumbnail ${index}`} />
          </div>
        ))}
        <div className="arrow" onClick={nextSlide}>
          &#10095;
        </div>
      </div>
    );
}

export default ThumbNail