import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/t2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>STAY IN WORLD'S MOST BEAUTIFUL PLACES AND BE AN OWNER</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/t3.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
        <h3>STAY IN WORLD'S MOST BEAUTIFUL PLACES AND BE AN OWNER</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
