import React, { Component } from "react";
import queryString from "query-string";
import { db, auth } from "../../firebase";
// import sizeMe from "react-sizeme";

import { Col, Row, Button } from "reactstrap";

import Carousel from "../../components/ui/Carousel/Carousel";
import ViewProfileButton from "../../components/ui/buttons/ViewProfileButton";

const headerStyle = {
  margin: "50px 0px",
  textAlign: "center"
};

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

const BannerSection = ({ width, title, images }) => (
  <Col style={{ flexBasis: width <= 570 ? "auto" : 0 }}>
    <BannerTitle title={title} />
    <BannerImageCarousel images={images} />
  </Col>
);

const InfoSection = ({ links, contact, about, need, team }) => (
  <Col>
    <div style={{ marginTop: 150 }} />
    {team && <TeamSection team={team} />}
    <br />
    {(contact || links) && <ContactSection contact={contact} links={links} />}
    <br />
    {about && <AboutSection about={about} />}
    <br />
    {need && <NeedSection need={need} />}
  </Col>
);

const TeamSection = ({ team }) => (
  <InfoView title="Team">
    <div style={{ display: "inline-grid" }}>
      {team.map((member, i) => (
        <ViewProfileButton key={i} uid={member.uid} text={member.name} />
      ))}
    </div>
  </InfoView>
);

const ContactSection = ({ contact, links }) => (
  <InfoView title="Contact us">
    {(contact || links) && (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <a href={"mailto:" + contact}>{contact}</a>
        {links.map((link, i) => (
          <a key={i} href={link}>
            {link}
          </a>
        ))}
      </div>
    )}
  </InfoView>
);

const AboutSection = ({ about }) => (
  <InfoView title="About us">
    <p>{about}</p>
  </InfoView>
);

const NeedSection = ({ need }) => (
  <InfoView title="Who we need">
    <div>
      {need}
      {/* {need.map(item => (
            <p>{item}</p>
          ))} */}
    </div>
  </InfoView>
);

const InfoView = ({ title, children }) => (
  <Row>
    <Col md={3}>
      <b>{title}</b>
    </Col>
    <Col>{children}</Col>
  </Row>
);

const LoadingView = () => (
  <div
    style={{
      display: "flex",
      height: "70vh",
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    Loading ...
  </div>
);

const EditProjectButton = ({ isOwner }) => (
  <div style={{ marginTop: 20 }}>
    {isOwner && <Button color="danger">Edit Project</Button>}
  </div>
);

class Page extends Component {
  state = { data: null, isOwner: false };

  componentDidMount = async () => {
    const values = queryString.parse(this.props.location.search);
    let data = await db.getProjectByID(values.id);
    let isOwner = auth.isCurrentAuthUser(data.owner);
    this.setState({ data, isOwner });
  };

  render() {
    const { data, isOwner } = this.state;
    // const { width } = this.props.size;
    if (data) {
      return (
        <div>
          <Row>
            <BannerSection
              // width={width}
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
          <EditProjectButton isOwner={isOwner} />
        </div>
      );
    } else return <LoadingView />;
  }
}

export default Page;
