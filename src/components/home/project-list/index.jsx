// Libraries
import React from "react";

// Components
import { Row, Col } from "reactstrap";
import Card from "components/shared/card";

const ProjectList = ({ projects }) => (
  <Row>
    {projects.map((p, i) => (
      <Col sm key={i}>
        <Card
          id={p.id}
          name={p.name}
          shortname={p.shortname}
          description={p.description}
          image={p.images && p.images[0]}
          tags={p.tags}
        />
      </Col>
    ))}
  </Row>
);

export default ProjectList;
