// Libraries
import React from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

// Components
import Carousel from "components/project-page/components/about/carousel";
import Button from "components/shared/button";

const Container = styled.div`
  padding: 50px 0px;
  grid-area: about;

  h5 {
    margin-bottom: 20px;
  }

  p {
    margin-top: 20px;
    font-size: 14pt;
    color: gray;
  }
`;

const About = ({ about, images, links }) => {
  if (isEmpty(about) && images.length === 0) {
    return null;
  }
  return (
    <Container>
      <h5>More about us:</h5>
      {images.length > 0 && <Carousel items={images} />}
      <p>{about}</p>
      <div>
        {links.map((link) => (
          <a href={link.url}>
            <Button variant="link">{link.name}</Button>
          </a>
        ))}
      </div>
    </Container>
  );
};
export default About;
