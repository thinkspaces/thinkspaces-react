import React, { Component } from "react";
import sizeMe from "react-sizeme";

import { Button } from "reactstrap";


import { Card, Icon, Image } from 'semantic-ui-react'
import sampleImg from '../../logo.png'


import styles from './Home.module.css'
import ProjectCard from "../../components/ui/project/ProjectCard/ProjectCard";
import SubmitProjectButton from "../../components/ui/buttons/SubmitProjectButton";

import { db } from "../../firebase";

const headerStyle = {
  margin: "50px 0px",
  textAlign: "center"
};

const buttonStyle = {
  margin: "20px 10px"
};

const trendingStyle = {
  padding: "5px"
};

class Home extends Component {
  state = {
    projects: []
  };

  componentDidMount = async () => {
    let projects = await db.getProjects();

    // update state
    this.setState({ projects });
  };

  render() {
    const { width } = this.props.size;

    return (
      <div>
        <div style={headerStyle}>
          <h1>Thinkspaces</h1>
          <h3>Find and work on projects started by Yalies</h3>
          <Button href="/projects" style={buttonStyle} outline>
            Browse Projects
          </Button>
          <SubmitProjectButton />
        </div>
        <br />
        <h3 style={trendingStyle}>
          <span role="img" aria-label="Fire">
            🔥
          </span>
          &nbsp;Noteworthy
        </h3>
        <div className={styles.genericProjectGrid}>
            <Card>
                <Image src={sampleImg} />
                <Card.Content>
                    <Card.Header>Thinkspaces</Card.Header>
                    <Card.Meta>Power to the Creators</Card.Meta>
                    <Card.Description style={{overflow:"hidden"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla asperiores eius, deserunt odio error reiciendis qui aut numquam, excepturi tempore odit dolorum molestias temporibus iure labore unde. Magni, hic beatae?
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a className="right floated">
                        <Icon name='comment' />
                        10
                    </a>
                    <a>
                        <Icon name='thumbs up' />
                        23
                    </a>
                </Card.Content>
            </Card>



            <ProjectCard
                width={width}
                id="wwUdHZ7mZ9vs7i7jEoDO"
                title="RAMP"
                shortname="ramp"
                image="https://firebasestorage.googleapis.com/v0/b/thinkspaces-a730b.appspot.com/o/projectpictures%2Framp.png?alt=media&token=3a2f6c1a-34ea-4fa4-87d3-96b0b102c3b0"
                text="RAMP is a free, intuitive, multilingual digital platform that connects the Greater New Haven community to resources such as food, education, healthcare, housing, legal assistance, and employment. We are currently looking for a volunteer Research Assistant for qualitative community-based research, Marketing Lead, and Fundraising Lead " />

            <ProjectCard
                width={width}
                id="VdnM4yC3ja52pYdNrrP7"
                title="Slashed"
                shortname="Slashed-"
                image="https://firebasestorage.googleapis.com/v0/b/thinkspaces-a730b.appspot.com/o/projectpictures%2Fd76618be-a6e1-420f-a582-f797c972a68b.png?alt=media&token=c9c2f645-3546-414e-b488-225cd0770493"
                text="Slashed is creating a smooth map, displaying all student friendly stores in your area. "
            />
            <ProjectCard
                width={width}
                id="BqeVjXffpd5fPu7jrU1q"
                title="Homecooked"
                shortname="homecooked"
                image="https://i.imgur.com/1zb0koc.jpg"
                text="A social dining app that lets you book homecooked meals made by people in your neighborhood."
            />
        </div>

        <br />
        <h3 style={trendingStyle}>
          <span role="img" aria-label="BikingMan">
            🚴‍
          </span>
          &nbsp;Up and Coming
        </h3>
        <div className={styles.genericProjectGrid}>
            <ProjectCard
              width={width}
              id="4NBBuiCNfqRoOSqtiKI6"
              title="Bird Box Blue Book"
              shortname="Bird-Box Blue-Book"
              image="https://i.imgur.com/3SvmD9j.jpg"
              text="Export your Yale courses to your calendar"
            />
            <ProjectCard
              width={width}
              id="p8NQdZmlXVT0lx3LuKif"
              title="Visionary Health"
              shortname="visionaryhealth"
              image="https://i.imgur.com/PKpZUP9.jpg"
              text="An AI/Healthcare startup developing the first automated imaging screening platform."
            />
            <ProjectCard
              width={width}
              id="qTIDaK6yicTgv27hpkS8"
              title="FoodWave"
              shortname="FoodWave"
              image=""
              text="FoodWave will be an application used by guests at hotels while on the beach."
            />
        </div>
      </div>
    );
  }
}

export default sizeMe()(Home);
