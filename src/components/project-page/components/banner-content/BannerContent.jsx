import React from 'react';
import { Col } from 'reactstrap';
import Carousel from '../carousel';

const headerStyle = { margin: '50px 0px', textAlign: 'center' };

const BannerTitle = ({ title }) => (
  <div style={headerStyle}>
    <h1>{title}</h1>
  </div>
);

const BannerImageCarousel = ({ images }) => (
  <div style={headerStyle}>
    {images[0].length > 0 ? (
      <Carousel items={images} />
    ) : (
      <img
        src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
        alt="default cover"
      />
    )}
  </div>
);

const BannerContent = ({ width, title, images }) => (
  <Col style={{ flexBasis: width < 720 ? 'auto' : 0 }}>
    <BannerTitle title={title} />
    <BannerImageCarousel images={images} />
  </Col>
);

export default BannerContent;
