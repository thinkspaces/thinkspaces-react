import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import sizeMe from "react-sizeme";
import Carousel from "../../components/ui/Carousel/Carousel";
import { db } from "../../firebase";
import ViewProfileButton from "../../components/ui/buttons/ViewProfileButton";

const headerStyle = {
  margin: "50px 0px 50px 0px",
  textAlign: "center"
};

const BannerSection = ({ width, title, images }) => (
  <Col style={{ flexBasis: width <= 570 ? "auto" : 0 }}>
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

const InfoSection = ({ links, contact, about, need, team }) => (
  <Col>
    <div style={{ marginTop: 150 }} />
    <InfoView team={team} />
    <br />
    <InfoView contact={contact} links={links} />
    <br />
    <InfoView about={about} />
    <br />
    <InfoView need={need} />
  </Col>
);

const InfoView = ({ team, contact, links, about, need }) => (
  <Row>
    <Col md={3}>
      {team && <b>Team</b>}
      {(contact || links) && <b>Contact us</b>}
      {about && <b>About us</b>}
      {need && <b>Who we need</b>}
    </Col>
    <Col>
      {team && (
        <div>
          {team.map(member => (
            <ViewProfileButton
              username={`${member.name.substr(
                0,
                member.name.indexOf(" ")
              )}.${member.uid.slice(0, 6)}`}
              uid={member.uid}
              text={member.name}
            />
          ))}
        </div>
      )}
      {(contact || links) && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a href={"mailto:" + contact}>{contact}</a>
          {links.map(link => (
            <a href={link}>{link}</a>
          ))}
        </div>
      )}
      {about && <p>{about}</p>}
      {need && (
        <div>
          {need}
          {/* {need.map(item => (
            <p>{item}</p>
          ))} */}
        </div>
      )}
    </Col>
  </Row>
);

class Page extends Component {
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
    const { width } = this.props.size;
    if (data) {
      return (
        <div>
          <Row>
            <BannerSection
              width={width}
              title={data.title}
              images={data.images}
            />
            <InfoSection
              links={data.links}
              contact={data.contact}
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

export default sizeMe()(Page);
