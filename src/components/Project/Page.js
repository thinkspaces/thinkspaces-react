import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import Carousel from "../Carousel/Carousel";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const headerStyle = {
  margin: "50px 0px 50px 0px",
  textAlign: "center"
};

const BannerSection = ({ title, images }) => (
  <Col>
    <div style={headerStyle}>
      <h1>{title}</h1>
    </div>
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
  </Col>
);

const InfoSection = ({ contact, about, need, team }) => (
  <Col>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <InfoView team={team} />
    <br />
    <InfoView contact={contact} />
    <br />
    <InfoView about={about} />
    <br />
    <InfoView need={need} />
  </Col>
);

const InfoView = ({ team, contact, about, need }) => (
  <Row justify-content-center>
    <Col md={3}>
      {team && <b>Team</b>}
      {contact && <b>Contact us</b>}
      {about && <b>About us</b>}
      {need && <b>Who we need</b>}
    </Col>
    <Col>
      {team && (
        <div>
          {team.map(member => (
            <Link
              to={{
                pathname: `/profile/someuser`,
                state: { uid: member.uid }
              }}
            >
              {member.name}
            </Link>
          ))}
        </div>
      )}
      {contact && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {contact.map(item => (
            <a href={"mailto:" + item}>{item}</a>
          ))}
        </div>
      )}
      {about && <p>{about}</p>}
      {need && (
        <div>
          {need.map(item => (
            <p>{item}</p>
          ))}
        </div>
      )}
    </Col>
  </Row>
);

export default class Page extends Component {
  state = { data: null };

  componentDidMount = async () => {
    if (this.props.location.state) {
      let id = this.props.location.state.id;
      let project = await db.getProjectByID(id);
      this.setState({ data: project.data() });
    }
  };

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <div>
          <Row>
            <BannerSection title={data.title} images={data.images} />
            <InfoSection
              contact={data.links}
              about={data.about}
              need={data.need}
              team={data.team}
            />
          </Row>
        </div>
      );
    } else return <div>no data</div>;
  }
}
