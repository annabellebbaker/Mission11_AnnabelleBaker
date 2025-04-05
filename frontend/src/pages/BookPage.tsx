import { useState, useEffect } from 'react';
import { Carousel } from 'bootstrap'; // Using Bootstrap's module directly
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';
import sleepsmarter from '../assets/sleepsmarter.jpg';
import screwtape from '../assets/screwtape.jpg';
import deep from '../assets/deep.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
// THE OTHER THING I USED WITH BOOTSTRAP
// made carousel functionality displaying best books right now

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const carouselElement = document.getElementById('featuredBooksCarousel');
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 5000,
        wrap: true,
      });
    }
  }, []);

  const carouselContainerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const imageStyle = {
    maxWidth: '60%', // Reducing width
    maxHeight: '200px', // Shrinking height further
    objectFit: 'contain' as 'contain',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    border: '1px solid #ddd',
  };

  // const slideCenterStyle = {
  //   height: '300px',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // };

  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />

      <div style={carouselContainerStyle}>
        <div
          id="featuredBooksCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={sleepsmarter}
                className="d-block w-100"
                style={imageStyle}
                alt="Featured Book 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={screwtape}
                className="d-block w-100"
                style={imageStyle}
                alt="Featured Book 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src={deep}
                className="d-block w-100"
                style={imageStyle}
                alt="Featured Book 3"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#featuredBooksCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#featuredBooksCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BookPage;
