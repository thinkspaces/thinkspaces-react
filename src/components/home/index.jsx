// Libraries
import React from "react";
import styled from "styled-components/macro";
import { orderBy } from "lodash";

// Components
import { Row, Col } from "reactstrap";
import Banner from "components/home/banner";
import Card from "components/shared/card";
import { Title } from "components/shared/typography";

// Hooks
import useProjects from "hooks/use-projects";

// Styles
import { pa } from "styles/utilities";

const Header = styled.div`
  margin: 50px 0;
`;

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

const Section = ({ ariaLabel, emoji, title }) => (
  <Title level={3} css={pa(5)}>
    <span role="img" aria-label={ariaLabel}>
      {emoji}
    </span>
    &nbsp;{title}
  </Title>
);

const Home = ({ history }) => {
  let projects = useProjects();
  projects = orderBy(projects, (p) => Object.keys(p.likes).length, ["desc"]);

  const toPage = (path) => () => {
    history.push(path);
  };

  return (
    <div>
      <Header>
        <Title>Find and work on projects by Yalies</Title>
        <Banner
          gotoSubmit={toPage("/submitproject")}
          goToSignUp={toPage("/signupin")}
          goToAbout={toPage("/about")}
        />
      </Header>
      <Section ariaLabel="Fire" emoji="🔥" title="Noteworthy" />
      <ProjectList projects={projects.slice(0, 3)} />
      <Section ariaLabel="BikingMan" emoji="🚴" title="Up and Coming" />
      <ProjectList projects={projects.slice(3, 6)} />
    </div>
  );
};

export default Home;
