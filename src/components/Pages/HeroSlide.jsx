import React, { useState } from "react";
import { Carousel } from "react-bootstrap";


const slides = [
  {
    img: "https://cdn.pixabay.com/photo/2025/08/17/07/43/tractor-9779346_1280.jpg",
    heading: "Welcome to Our Coaching",
    subText: "Learn, Grow, and Achieve Success",
  },
  {
    img: "https://cdn.pixabay.com/photo/2025/06/08/16/06/horse-9648183_1280.jpg",
    heading: "Interactive Classes",
    subText: "Engaging sessions for better understanding",
  },
  {
    img: "https://cdn.pixabay.com/photo/2022/09/12/12/15/netherlands-7449282_1280.jpg",
    heading: "Expert Teachers",
    subText: "Learn from highly qualified educators",
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      controls
      indicators
      interval={3000}
      fade
      className="hero-carousel"
    >
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block w-100 hero-img" src={slide.img} alt={`Slide ${idx + 1}`} />
          <Carousel.Caption className="hero-caption">
            <h1>{slide.heading}</h1>
            <p>{slide.subText}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroSlider;
