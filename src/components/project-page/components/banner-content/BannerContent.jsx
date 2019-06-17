import React from 'react';
import { Col } from 'reactstrap';
import Carousel from '../carousel';

const headerStyle = { margin: '50px 0px', textAlign: 'center' };

const BannerTitle = ({ name }) => (
  <div style={headerStyle}>
    <h1>{name}</h1>
  </div>
);

const BannerImageCarousel = ({ images }) => (
  <div style={headerStyle}>
    {images && images.length > 0 ? (
      <Carousel items={images} />
    ) : (
      <img src="https://via.placeholder.com/300" alt="default cover" />
    )}
  </div>
);

const BannerContent = ({ width, name, images }) => (
  <Col style={{ flexBasis: width < 720 ? 'auto' : 0 }}>
    <BannerTitle name={name} />
    <BannerImageCarousel images={images} />
  </Col>
);

export default BannerContent;
