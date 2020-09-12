// Libraries
import React from "react";
import {} from "styled-components/macro";
import { orderBy } from "lodash";

// Components
import ProjectList from "components/home/project-list";
import Section from "components/home/section";
import Banner from "components/home/banner";
import { Title } from "components/shared/typography";

// Hooks
import useProjects from "hooks/use-projects";

// Styles
import { mb } from "styles/utilities";

const Home = ({ history }) => {
  let projects = useProjects();
  projects = orderBy(projects, (p) => Object.keys(p.likes).length, ["desc"]);

  const toPage = (path) => () => {
    history.push(path);
  };

  return (
    <div>
      <header css={mb(50)}>
        <Title>Find and work on projects by Yalies</Title>
        <Banner
          gotoSubmit={toPage("/submitproject")}
          goToSignUp={toPage("/signupin")}
          goToAbout={toPage("/about")}
        />
      </header>
      <Section ariaLabel="Fire" emoji="🔥" title="Noteworthy" />
      <ProjectList projects={projects.slice(0, 3)} />
      <Section ariaLabel="BikingMan" emoji="🚴" title="Up and Coming" />
      <ProjectList projects={projects.slice(3, 6)} />
    </div>
  );
};

export default Home;
