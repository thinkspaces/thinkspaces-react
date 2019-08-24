import React, { Component } from 'react';
import { Carousel as RSCarousel, CarouselItem, CarouselIndicators } from 'reactstrap';

const imageStyle = {
  height: '320px',
  objectFit: 'contain',
  width: '100%',
  paddingLeft: '15%',
  paddingRight: '15%',
};

class Carousel extends Component {
  state = { activeIndex: 0 };

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = () => {
    if (this.animating) return;
    const { activeIndex } = this.state;
    const { items } = this.props;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.animating) return;
    const { activeIndex } = this.state;
    const { items } = this.props;

    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    const { items } = this.props;
    const slides = items.map((item, i) => (
      <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={i}>
        <img src={item} style={imageStyle} className="img-fluid" alt="carousel images" />
        {/* <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          /> */}
      </CarouselItem>
    ));

    return (
      <RSCarousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
      </RSCarousel>
    );
  }
}

export default Carousel;
